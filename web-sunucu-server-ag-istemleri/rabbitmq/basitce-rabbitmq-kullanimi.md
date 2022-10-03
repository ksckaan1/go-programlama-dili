# Basitçe RabbitMQ Kullanımı

Proje yapımız bu şekilde olacak.

```
├── consumer
│   └── consumer.go
├── go.mod
├── go.sum
└── producer
    └── producer.go
```

Öğrenirken rahatlık olması açısından önden proje yapısını bu şekilde oluşturabilirsiniz.

Go üzerinde RabbitMQ'yu kullanabilmek için gerekli olan paketimizi kuralım.

`go get github.com/streadway/amqp`

`producer.go` isminde bir dosya oluşturalım. Bu dosyamız RabbitMQ'ya mesaj gönderen kodlarımızı barındıracak.

{% code title="producer.go" %}
```go
package main

import (
	"fmt"
	"log"

	"github.com/streadway/amqp"
)

func main() {
	//Önce RabbitMQ sunucumuzla bağlantı kuralım.
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	if err != nil {
		log.Fatalln(err)
	}
	defer conn.Close()

	//Mesajımızı göndermek için bir kanal oluşturalım.
	ch, err := conn.Channel()
	if err != nil {
		log.Fatalln(err)
	}
	defer ch.Close()

	//Mesajımızı göndereceğimiz kuyruğu tanımlayalım.
	kuyruk, err := ch.QueueDeclare(
		"kuyruk1", // kuyruğumuzun ismi
		false,     // durable
		false,     // delete when unused
		false,     // exclusive
		false,     // no-wait
		nil,       // arguments
	)
	if err != nil {
		log.Fatalln(err)
	}

	mesajımız := "Hello World!"

	//Mesajımızı paylaşmak için yapmamız gerekenler
	err = ch.Publish(
		"",          // exchange
		kuyruk.Name, // Gönderilecek kuyruk ismi. Bu şekilde önceki oluşturduğumuz kuyruğun ismini alabiliriz
		false,       // mandatory
		false,       // immediate
		amqp.Publishing{
			ContentType: "text/plain", //mesajımızın tipi
			Body:        []byte(mesajımız),
		})
	if err != nil {
		log.Fatalln(err)
	}

	fmt.Println("Mesajımız başarılı bir şekilde gönderildi!")

}çgo
```
{% endcode %}

Yorum satırı olarak yaptığım açıklamalar dışında ek olarak inceleyelim.

`amqp.Dial()` fonksiyonu içerisinde ayağa kaldırdığımız RabbitMQ servisine bağlanmak için gerekli olan bilgileri girdik.

Daha sonra RabbitMQ servisimizle iletişimde bulunmak için kanal oluşturduk.

Mesajımızı bir kuyruğa göndereceğimiz için kuyruk oluşturduk ve bu kuyruğa `kuyruk1` ismini verdik. Aslında bu işlemlerde çok fazla detay var ama basit kullanımını göstermek için özetle anlatıyor olacağım.

`Publish()` fonksiyonu içerisinde mesajımızı göndereceğimiz ayarlamaları yaptık.

`amqp.Publishing{}` yapısında göndereceğimizi içeriğin tipini belirttik ve mesajımızı byte dizisine çevirerek gönderdik.

Bu şekilde `kuyruk1` isimli kuyruğumuza `"Hello World!"` yazısını gönderdik ve bu yazımız kuyrukta bekliyor.

Programımızı her çalıştırdığımızda kuyruğumuza mesajımız bir kez daha eklenecektir.

Eğer RabbitMQ panelinden görmek isterseniz, [http://localhost:15672](http://localhost:15672) adresinden girişi yaparak gözlemleyebilirsiniz.

Varsayılan olarak `Username` ve `Password` kısımlarına `guest` yazarak panele giriş yapabilirsiniz.

Oluşturduğumuz kuyruğu incelemek için `Queues` sekmesine bakabilirsiniz.

![](<../../.gitbook/assets/Screen Shot 2022-05-06 at 22.26.18.png>)

Ready sütununda işlenmeye hazır bekleyen 7 adet mesajımızın olduğunu görebilirsiniz. Çünkü `producer` kodlarımızı 7 defa çalıştırdım. Böylelikle RabbitMQ'ya 7 defa mesaj göndermiş oldu. Tablomuz ne kadar süper anlık olmasa da elinden geldiğince anlık bilgileri vermeye çalışıyor :smile:

Mesajlarımız `kuyruk1`'de birikti. Şimdi bu mesajlarımızı sıra sıra alacak bir `consumer` oluşturalım.

Önce `consumer.go` isimli bir dosya oluşturalım.

{% code title="consumer.go" %}
```go
package main

import (
	"log"

	"github.com/streadway/amqp"
)

func main() {
	//RabbitMQ Sunucumuza bağlanıyoruz
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	defer conn.Close()

	//İletişim kurabilmek için kanal oluşturalım
	ch, err := conn.Channel()
	if err != nil {
		log.Fatalln(err)
	}
	defer ch.Close()

	//Kuyruğumuzu tanımlıyoruz
	_, err = ch.QueueDeclare(
		"kuyruk1", // name
		false,     // durable
		false,     // delete when unused
		false,     // exclusive
		false,     // no-wait
		nil,       // arguments
	)
	if err != nil {
		log.Fatalln(err)
	}

	//İşte burada kuyruğumuzu dinliyoruz.
	msgs, err := ch.Consume(
		"kuyruk1", // Bu sfer dinleyeceğim kuyruk ismini kendim yazdım
		"",        // consumer
		true,      // auto-ack
		false,     // exclusive
		false,     // no-local
		false,     // no-wait
		nil,       // args
	)
	if err != nil {
		log.Fatalln(err)
	}
	//Burada goroutine ile çalışan fonksiyonumuz
	//çalışırken programın kapanmaması için
	//kanal oluşturduk
	forever := make(chan bool)

	go func() {
		//Burada eğer varsa kuyruktaki mesajları çekiyoruz
		for d := range msgs {
			//d değişkeni ile kuyruktaki mesajın bilgilerine ulaşabiliriz.
			log.Printf("Alınan mesaj: %s", d.Body)
			//Kuyruktaki mesaj ekrana bastırdık.
		}
	}()

	log.Printf(" [*] Kuyruk1 dinleniyor...")

	//Burada forever isimli kanalımıza değer gönderilmeyeceği için
	//programımız kapanmayacak ve sürekli olarak kuyruktaki mesajları çekecektir.
	<-forever
}

```
{% endcode %}

Detaylıca incelersek;

`consumer.go` içerisinde yeniden kuyruğumuz yani `kuyruk1`'in tanımlamasını yaptık. Aslında kuyruğumuzu producer kodlarında zaten tanımlamıştık. Peki burada neden yeniden kuyruk tanımlaması yaptığımızı açıklayalım.

`consumer.go`'da kuyruk tanımlaması yapmadan çalıştırırsak, `Consume()` fonksiyonunda kuyruk ismini belirterek dinleme yapmamız mümkündür. Fakat RabbitMQ sunucusunu yeniden başlattığımızda `kuyruk1` isimli kuyruğun silindiğini göreceksiniz. Kuyruk tanımlaması yapmazsak `consumer.go` dosyamız çalıştırıldığında `kuyruk1` isimli bir kuyruk olmadığı hatasını verecektir. Bunun için işimizi garantiye alıp kuyruğumuzu tanımlıyoruz. Yani producer oluşturmadıysa consumer'ın kuyruğu oluşturmasını sağlıyoruz.

Yukarıdaki consumer örneğimizde, gelen mesajı ekrana bastırmak yerine uzun sürecek bir işlem yapabilirdik ki, zaten RabbitMQ'nun en çok kullanılan alanlarından biri de uzun süren işlemlerdir.

Fakat örnekte direkt olarak bir sonuç görmek ve başka alanlara sapmamak için basit olarak nasıl çalıştığını gösterdim.
