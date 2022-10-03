# Log (Kayıt)

**Log** paketi standart Golang paketleri içerisinde gelir ve programdaki olayları kaydetmemizi yarayacak bir altyapı sunar. Log programcının gözü kulağıdır. Bize hataları (bugs) bulmamız için kolaylık sağlar. Örneğimize geçelim.

```go
package main
import (
    "log"      
)
func init(){
    log.SetPrefix("KAYIT: ")
    log.SetFlags(log.Ldate | log.Lmicroseconds | log.Llongfile)
}
func main() {
    log.Println("main fonksiyonu başladı")
 
    log.Fatalln("ölümcül hata")
 
    log.Panicln("panic mesajı")
}
```

Hemen açıklamasına geçelim. İlk olarak `log` paketimizi içe aktarıyoruz. **** `init()` fonksiyonunda log paketimiz ile ilgili ön ayarları yapıyoruz. Tabi biz bu işlemleri `init` fonksiyonu içerisinde yapmak zorunda değiliz.

{% content-ref url="../boeluem-5/init-fonksiyonu-oen-yuekleme.md" %}
[init-fonksiyonu-oen-yuekleme.md](../boeluem-5/init-fonksiyonu-oen-yuekleme.md)
{% endcontent-ref %}

`init()` fonksiyonumuzun içerisini dikkatlice inceleyelim. log paketimizin üzerine ayarlamalar yapıyoruz.\


`SetPrefix()` fonksiyonu ile log çıktımızın satırının başında ne yazacağını belirleyebiliyoruz.\


`SetFlags ()` fonksiyonu ile log çıktımızın görünüşünü ayarlıyoruz. **log.Ldate** bize zamanını gösteriyor. `log.Lmicroseconds` mikrosaniyeyi ve `log.Llongfile` ise dosyanın bulunduğu dizin ile ismini ve yapılan işlem ile ilgili satırı gösteriyor.\


log önyüklemizi yaptığımızı opsiyonel olarak **log.Println()** ile belirtiyoruz.\


**`main()`** fonksiyonumuzun içerisini incelediğimizde ise;\
`log.Println()` fonksiyonu ile klasik log çıktılama işlemini yapıyoruz. Fonksiyonun sonundaki **ln** bir alt satıra geçildğini gösteriyor.\


`log.Fatalln()` fonksiyonu ile kritik hataları bildirir. `log.Println()` fonksiyonundan farkı program **1 çıkış kodu** ile biter. Bu da programın hatalı bittiği anlamına gelir. Normalde sağlıklı çalışan bir program **0 çıkış kodu** ile biter. 0 çıkış kodunu Golang programlama da kullanmamıza gerek kalmaz. Fakat C gibi dillerde ana fonksiyonun sonunda **return 0** ibaresini yazmak zorundayız.\
`log.Panicln()` fonksiyonunda ise ekrana çıktımızı verir ve aynı zamanda bunu normal **panic()** fonksiyonu ile yapar.

\
Çıktımız ise şöyle olacaktır:

> KAYIT: 2019/10/10 20:29:14.107529 /home/ksc10/Desktop/deneme/main.go:13: main fonksiyonu başladı\
> KAYIT: 2019/10/10 20:29:14.107539 /home/ksc10/Desktop/deneme/main.go:15: ölümcül hata\
> exit status 1

Gördüğünüz gibi son satırda **çıkış durumunun 1** olduğunu yazıyor.\
panic mesajı programı direkt sonlandırır. panic mesajını daha üste yazarak deneyebilirsiniz.

Diğer bir örneğimize geçelim.

```go
package main

import (
	"log"
	"os"
)

func main() {
	log.SetPrefix("KAYITIM: ")
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
	logDosyam, _ := os.Create("kayit.log")
	defer logDosyam.Close()
	log.SetOutput(logDosyam)
	log.Println("Bir sıkıntı yaşadık ama mühim değil :/")
	log.Fatalln("Bu sefer çok kötü birşey oldu :<")
}
```

Yukarıdaki kodlarımızda 9. satırda logumuz için ön yazı ekledik. Daha sonra logumuzun şeklini yapılandırdık. Bu sefer `log.Lshortfile` yazarak dosyamızın ismini dizin olmadan ve çıktının yapıldığı satırı bastırmasını istedik.

11\. satırda loglarımızı kaydetmek için `kayit.log` adında bir dosya oluşturduk. `log.SetOutput` fonksiyonu ile log dosyamızı belirttik. Artık loglarımız komut satırında gözükmek yerine belirttiğimiz dosyaya yazılacaktır.

`kayit.log` dosyamızda aşağıdaki gibi bir sonuç ile karşılaşacağız.

> KAYITIM: 2022/04/18 02:44:56 main.go:14: Bir sıkıntı yaşadık ama mühim değil :/
>
> KAYITIM: 2022/04/18 02:44:56 main.go:15: Bu sefer çok kötü birşey oldu :<

Yukarıdaki senaryoda log çıktılarımız `kayit.log` dosyasına yazıldı. Programı çalıştırdığınızda farketmişsinizdir, log çıktılarımız komut satırı üzerinde görüntülenmedi. Çünkü kodumuzda belirttiğimiz gibi bir dosyaya yazılması için ayarlama yaptık. Peki log çıktımızın hem belirttiğimiz dosyaya yazılmasını hem de komut satırına bastırılmasını isteseydeik ne yapmamız gerekirdir? Bir sonraki örneğimize geçelim.

```go
package main

import (
	"io"
	"log"
	"os"
)

func main() {
	log.SetPrefix("KAYITIM: ")
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
	logDosyam, _ := os.Create("kayit.log")
	defer logDosyam.Close()

	mw := io.MultiWriter(os.Stdout, logDosyam)

	log.SetOutput(mw)
	log.Println("Bir sıkıntı yaşadık ama mühim değil :/")
	log.Fatalln("Bu sefer çok kötü birşey oldu :<")
}
```

Önceki kodlarımızdan farklı olarak 15. satırda bir `multiwriter` oluşturduk ve hem komut satırına hem log dosyamıza yazdırması için ayarladık.

`setOutput` fonksiyonunda ise multiwriter'ımızı kullandık. Bu sayede programımız çalıştığında log çıktılarımız hem komut satırında hem de `kayit.log` dosyamıza yazdırılacaktır.
