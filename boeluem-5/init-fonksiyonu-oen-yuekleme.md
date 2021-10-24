# init() Fonksiyonu (Ön Yükleme)

Golang’te bir uygulama çalışırken genelde çalışan ilk fonksiyon **main() **fonksiyonu oluyor. Bazen programın açılışında ayarlamamız gereken ön durumlar oluşuyor. İşte** init()** fonksiyonu bize bu imkanı sunuyor. Ufak bir örnekle yazdıklarıma anlam katalım.

```go
package main
import "fmt"
func init() {
	fmt.Println("init fonksiyonu yüklendi")
}
func main() {
	fmt.Println("main Fonksiyonu yüklendi")
}
```

Çıktımız aşağıdaki gibi olacaktır.

> init fonksiyonu yüklendi\
> main Fonksiyonu yüklendi

Golang’taki **init()** fonksiyonunun kullanımı, farklı dillerdeki aynı işlevi gören fonksiyonlara oranla daha kolaydır. Örnek olarak **init()** fonksiyonunda veritabanı bağlantımızı, kayıt defteri işlemlerimizi veya sadece bir kez yapmamız gereken işleri yapabiliriz. Buna imkan sağlayan mantığı aşağıdaki örnekte görelim. Bu örnekte global tanımlanmış değişkenin değerini** init()** fonksiyonunda değiştirdiğimizde** main() **gibi farklı fonksiyonlarda kullanabildiğimizi göreceğiz.

```go
package main
import "fmt"
var değişken string
func init() {
	değişken = "Merhaba Dünya"
}
func main() {
	fmt.Println(değişken)
}
```

Çıktımız ise şöyle olacaktır.

> Merhaba Dünya

İşte** init() **fonksiyonunun böyle bir güzelliği var. Benzer bir işlevi ancak pointers (işaretçiler) ile yapabiliriz.

```go
package main
import "fmt"
var değişken string = "Naber"
func değiştir(değişken *string) {
	*değişken = "Merhaba Dünya"
}
func main() {
	değiştir(&değişken)
	fmt.Println(değişken)
}
```

O da gördüğünüz gibi uzun bir işlem oluyor.
