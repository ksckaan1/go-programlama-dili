# Log \(Kayıt\)

**Log** paketi standart Golang paketleri içerisinde gelir ve programdaki olayları kaydetmemizi yarayacak bir altyapı sunar. Log programcının gözü kulağıdır. Bize hataları \(bugs\) bulmamız için kolaylık sağlar. Örneğimize geçelim.

```go
package main
import (
    "log"      
)
func init(){
    log.SetPrefix("KAYIT: ")
    log.SetFlags(log.Ldate | log.Lmicroseconds | log.Llongfile)
    log.Println("ön yükleme tamamlandı")
}
func main() {
    log.Println("main fonksiyonu başladı")
 
    log.Fatalln("ölümcül hata")
 
	log.Panicln("panic mesajı")
}
```

Hemen açıklamasına geçelim. İlk olarak **log** paketimizi içe aktarıyoruz. **init\(\)** fonksiyonunda log paketimiz ile ilgili ön ayarları yapıyoruz.

{% page-ref page="../boeluem-5/init-fonksiyonu-oen-yuekleme.md" %}

**init\(\)** fonksiyonumuzun içerisini dikkatlice inceleyelim. log paketimizin üzerine ayarlamalar yapıyoruz.  


**SetPrefix\(\)** fonksiyonu ile log çıktımızın satırının başında ne yazacağını belirleyebiliyoruz.  


**SetFlags \(\)** fonksiyonu ile log çıktımızın görünüşünü ayarlıyoruz. **log.Ldate** bize zamanını gösteriyor. **log.Lmicroseconds** mikrosaniyeyi ve **log.Llongfile** ise dosya ismini ve yapılan işlem ile ilgili satırı gösteriyor.  


log önyüklemizi yaptığımızı opsiyonel olarak **log.Println\(\)** ile belirtiyoruz.  


**main\(\)** fonksiyonumuzun içerisini incelediğimizde ise;  
l**og.Println\(\)** fonksiyonu ile klasik log çıktılama işlemini yapıyoruz. Fonksiyonun sonundaki **ln** bir alt satıra geçildğini gösteriyor.  


**log.Fatalln\(\)** fonksiyonu ile kritik hataları bildirir. log.Println\(\) fonksiyonundan farkı program **1 çıkış kodu** ile biter. Bu da programın hatalı bittiği anlamına gelir. Normalde sağlıklı çalışan bir program **0 çıkış kodu** ile biter. 0 çıkış kodunu Golang programlama da kullanmamıza gerek kalmaz. Fakat C gibi dillerde ana fonksiyonun sonunda **return 0** ibaresini yazmak zorundayız.  
**log.Panicln\(\)** fonksiyonunda ise ekrana çıktımızı verir ve aynı zamanda bunu normal **panic\(\)** fonksiyonu ile yapar.

  
Çıktımız ise şöyle olacaktır:

> KAYIT: 2019/10/10 20:29:14.107438 /home/ksc10/Desktop/deneme/main.go:10: ön yükleme tamamlandı  
> KAYIT: 2019/10/10 20:29:14.107529 /home/ksc10/Desktop/deneme/main.go:13: main fonksiyonu başladı  
> KAYIT: 2019/10/10 20:29:14.107539 /home/ksc10/Desktop/deneme/main.go:15: ölümcül hata  
> exit status 1

Gördüğünüz gibi son satırda **çıkış durumunun 1** olduğunu yazıyor.  
panic mesajı programı direkt sonlandırır. panic mesajını daha üste yazarak deneyebilirsiniz.

