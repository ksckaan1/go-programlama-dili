# RabbitMQ

{% hint style="info" %}
RabbitMQ hakkında bilginiz varsa sonraki sayfaya geçebilirsiniz.
{% endhint %}

## RabbitMQ Nedir?

Öncelikle RabbitMQ hakkında bilgi edinmek veya bilgilerini tazelemek isteyenler için ufak bir bilgi edinelim.

RabbitMQ, mesaj kuyruğu sistemidir. AMQP üzerinde kurulu bir sistemdir.

### Peki AMQP Nedir?

AMQP'nin açılımı Advenced Message Queue Protocol'dür (Gelişmiş Mesaj Kuyruğu Sistemi).

Basitçe kabul edilen mesajları sıraya göre işleyebileceğimiz bir protokoldür.



### Peki biz bu sistemi hangi ihtiyaçlarımızı gidermek için kullanırız?

Bizim için önemli olan kısım burası. En çok kullanılan alanlar,

* Uzun süren işlemler ve arkaplan işlemleri,
* Mikroservisler arasındaki iletişim (aracılık),
* Basitçe dosya işleme (ve alt kategorilerde),
* Arkaplan sistem ölçekleme ve yedeklemedir.

Yukarıdaki maddelerin daha anlaşılır olması için ufak bir senaryo düşünelim.

Bir sunucumuz var ve bu sunucumuz bir parametre alarak, bu parametre hakkında belirli mecralardan veri topluyor. Fakat bu veri toplama işi, sistemi yorabilecek bir işlem. Bu parametremizi  sistemimizi kullanan kullanıcıdan aldığımızı düşünelim.&#x20;

#### Peki aynı anda birden fazla kullanıcıdan parametre alıp veri araştırması yaptığımız bir durum ile karşılaşırsak ne olurdu?

Belirli bir işlemden sonra sunucumuzun bulunduğu sistemin kaynakları yetersiz gelirdi ve tabiri caizse sunucumuz çökerdi.

İşte böyle bir örnek durumda Message Queue kullanabiliriz.

## RabbitMQ Çalışma Akışı

![](../../.gitbook/assets/workflow-rabbitmq.png)

Yukarıdaki şemada, basitçe bir Message Queue'nin hangi işlemlerden geçtiğini görebiliriz.

Kavramlara göz atmak gerekirse;

#### Producer

Producer, mesajımızı RabbitMQ'ya gönderen arkadaşımız. Mesajımız düz bir yazı haricinde bir yapı da (json vs...) olabilir. Bu olayda mesaj diye adlandırılır. Producer basitçe bir yayınlayıcıdır ve RabbitMQ'ya mesajımızı gönderir.

#### Broker

Broker, Producer'dan gelen mesajları sıraya alır ve mesajı almaya müsait olan bir Consumer'a gönderir. Yani mesajlarımızı depolayan bir birimdir.

#### Consumer

Comsumer ise broker'a gelen mesajları alır ve istenilen şekilde mesajlar ile işlemler yapabilir. Ve hatta aldığı mesajlara bir yanıt üretebilir (rpc olarak kullanıldığında).



#### Bahsettiğimiz senaryoya RabbitMQ'yu entegre etseydik, senaryomuz şöyle sonuçlanırdı.

Örnek olarak kullanıcıdan isim soyisim aldığımızı düşünelim ve bu aldığımızı bilgiyi internette aratarak bilgi toplayacağımızı düşünelim. İşlemimiz uzun sürebileceği için böyle bir işlemi hızlı olmasını istediğimiz bir sunucuda yapmak istemeyebiliriz. Bunun için isim-soyisim'i Broker'ımız olan RabbitMQ'ya mesaj olarak atıyoruz ve bu mesajlarımızı teker teker consumer, yani asıl araştırma yükünü üstlenecek kısım alıp mesaj içeriğine göre araştırma yapacak. Toplanılan bilgiyi bir veritabanına kaydedecek veya istenirse mesajı gönderen producer'a cevap olarak dönebilecek.

Eğer cevap olarak dönerse producer'ımız araştırma işlemi bitene kadar bekleyecek fakat sistemimiz birden fazla araştırma yaparak yorulmamış olarak.

İstersek birden fazla consumer oluşturarak aynı anda birden fazla isim-soyisim araştırması da yapabiliriz. Bu biraz da kurduğumuz sisteme bağlı bir işlem.

Ufak ufak örnekler ile konumuzu pekiştirebiliriz.
