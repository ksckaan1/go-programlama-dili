# Testing \(Test Etme\)

Hücrelerin vücumudaki yapı birimi olduğu gibi, aynı şekilde her bileşen de yazılımın birer parçasıdır. Yazılımın sağlıklı bir şekilde çalışabilmesi için, her bileşenin güvenilir bir şekilde çalışması gerekir.  
Aynı şekilde vücudumuzun sağlığı hücrelerin güvenilirliği ve verimliliğine bağlı olduğu gibi, yazılımın düzgün çalışması bileşenlerin güvenilirliği ve verimliliğine bağlıdır.  
Biraz biyoloji dersi gibi oldu ama sonuçta aynı mantığı yürütebiliriz.  


**Peki bileşenler nedir?**  
Yazılımın çalışması için yazılmış her bir kod parçasına denir. Bu bileşenlerin yazılımımızın sağlıklı bir şekilde çalıştırdığından emin olmamız gerekir.  
Peki bu bileşenlerin sağlamlık kontrolünü nasıl gerçekleştiririz? Tabiki **test** ederek.  
Bir test aşamsının Golang’ta nasıl göründüğünü görelim.

```go
import "testing"
func TestFunc(t *testing.T){
    t.error() //testin başarısız olduğunu bildirir.
}
```

Yukarıdaki işlem Golang’ta yapılan bir birim testin temel yapısıdır. Yerleşik **testing** paketi, Golang’ın standart paketleri içerisinde gelir. Birim testi, **\*testing.T** türündeki elemanı kabul eden ve bu elemanı göre hata yayınlayan bir bir işlemdir.  
Bu fonksiyonların adı büyük harfle başlamalı ve birleşik olan adın devamı da büyük harfle başlamalıdır. Yani **camel-case** olmalıdır.  
`TestFunc olmalıdır ve Testfunc olmamalıdır.`  
Uygulama örneğimize geçelim.  
Bir proje klasörü oluşturalım ve **main.go** dosyamız şöyle olsun.

```go
package main
import "fmt"
func Merhaba(isim string) (çıktı string) {
	çıktı = "Merhaba " + isim
	return
}
func main() {
	selamla := Merhaba("Kaan")
	fmt.Println(selamla)
}
```



**main.go** dosyamızda fonksiyona adını girdiğimiz kişiyi selamlıyor. Buraya kadar gayet basit bir program. Fonksiyonlarımızı test edeceğimiz için baş harflerini büyük yazmayı unutmuyoruz. Böylelikle fonksiyonlarımızı dışarı aktarabiliriz. Test fonksiyonumuzun çalışma mantığını görmek için **main\_test.go** dosyamıza bakalım.

```go
package main
import "testing"
func TestMerhaba(t *testing.T) {
	if Merhaba("Kaan") != "Merhaba Kaan" {
		t.Error("Merhaba Fonksiyonunda bir sıkıntı var!")
	}
}
```

Yukarıda ise **main.go** sayfamızdaki **Merhaba** fonksiyonunu test etmek için **TestMerhaba** adında fonksiyon oluşturduk. **t \*testing.T** ibaresi ile bu işlemin test etmeye yönelik bir işlem olduğunu belirttik.  
Fonksiyonun içerisine baktığımızda, **Merhaba\(“Kaan”\)** işleminin sonucu **“Merhaba Kaan”** olmadığı zaman test hatası vermesini istedik. Ve gözükecek hatayı belirttik.  
Test işlemi yapmak için aşağıdaki komutları komut satırına yazıyoruz.

> go test

Yukarıdaki yazdığımız kodlara göre şöyle bir çıktımızın olması gerekir.

> PASS ok  
> \_/home/ksc10/Desktop/deneme 0.002s

Eğer **TestMerhaba** fonksiyonunda test koşuluna **“Merhaba Kaan”** yerine **“Merhaba Ahmet”** yazsaydık, aşağıdaki gibi bir **go test** çıktımız olurdu.

> --- FAIL: TestMerhaba \(0.00s\)  
>        main\_test.go:7: Merhaba Fonksiyonunda bir sıkıntı var!  
> FAIL  
> exit status 1  
> FAIL \_/home/ksc10/Desktop/deneme 0.002s

**Go Test Komutları**

| Komut | Açıklama |
| :--- | :--- |
| go test | İçerisinde bulunduğu projenin tüm test fonksiyonlarını test eder. |
| go test -v | Her test için ayrı bilgi verir. |
| go test -timeout 30s | 30 saniye zaman aşımı ile test eder. |
| go test -run TestMerhaba | Sadece belirli bir fonksiyonu test eder. |

**Örnek kullanımı:**  
**main\_test.go** dosyamızdaki **TestMerhaba** fonksiyonumuzu **10 saniye** zaman aşımı ile test edecek komut

> go test -timeout 30s -run TestMerhaba

Bu yazımızda Golang’de test işleminin nasıl yapıldığını gördük. Mantığını daha iyi kavramak için bir proje üzerinde gerekli olduğu yerde kullanmamız gerekir.

