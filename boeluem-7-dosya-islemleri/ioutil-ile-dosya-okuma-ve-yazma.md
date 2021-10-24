# ioutil ile Dosya Okuma ve Yazma

**ioutil** paketi standart Golang paketleri içerisinde gelir ve dosya işlemleri yapabilmemiz için bize fonksiyonlar sağlar.

**Dosya Okuma**

Hemen örneğimize geçelim. Açıklamaları kod üzerinde ilgili alanlara yazdım.

```go
package main
import (
	"fmt"
	"io/ioutil"
)
// Hatayı kontrol etmek için fonksiyonumuz
func kontrol(err error) {
	if err != nil {
		panic(err)
	}
}
func main() {
	// Okunacak dosyamızı belirtiyoruz
	dosya, err := ioutil.ReadFile("dosya.txt")
	// Hata kontrolü yapıyoruz.
	kontrol(err)
	//Dosyamızın içeriğini ekrana bastırıyoruz.
	fmt.Println(string(dosya))
}
```

{% hint style="info" %}
Okuma işlemi **byte** tipinde yapıldığı için **string() **fonksiyonu ile byte tipini string tipine dönüştürüyoruz.
{% endhint %}

**Dosya Yazma**

```go
package main
import (
	"io/ioutil"
)
// Hatayı kontrol etmek için fonksiyonumuz
func kontrol(err error) {
	if err != nil {
		panic(err)
	}
}
func main() {
	// Yazmak istediğimiz veriyi belirtiyoruz
	veri := []byte("golangtr.org")
	// Dosya yazma işlemini başlatıyoruz.
	err := ioutil.WriteFile("dosya.txt", veri, 0644) // 0644 dosya yazdırma izni oluyor.
	// Hata kontrolü yapıyoruz.
	kontrol(err)
}
```

{% hint style="info" %}
String tipini dosyaya yazdırmamız için önce byte tipine çevirmemiz gerekir.
{% endhint %}

Dosya yazdırma işleminde aynı isimde dosya varsa üzerine yazar.
