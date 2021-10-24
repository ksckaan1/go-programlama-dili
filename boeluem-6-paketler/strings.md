# Strings

Strings paketi ile **string** türünde değerler üzerinde işlemler yapabiliriz. Kısaca kullanımlarından bahsedelim.\


**Strings.Contains() Fonksiyonu**\
**Contains()** fonksiyonu ile istediğimiz bir string değerin içerisinde istediğimiz bir **string** değerin olup olmadığını kontrol edebiliriz. **Boolean** değer verir. Eğer varsa **true** değer döndürür. Yoksa **false** değer döndürür. Ufak bir uygulama örneği yapalım.

```go
package main
import (
 "fmt"
 "strings"
)
func main() {
 var eposta string
 fmt.Print("E-posta adresinizi giriniz: ")
 fmt.Scan(&eposta)
 if strings.Contains(eposta, "@") {
  fmt.Println("E-posta Adresiniz Onaylandı!")
 } else {
  fmt.Println("Geçerli Bir E-posta Adresi Giriniz!")
 }
}
```

**”strings”** paketini eklemeyi unutmuyoruz. Bu kodlar ile kullanıcıdan e-posta adresi isteyen ve e-posta adresi içinde **@** işareti var ise olumlu yanıt veren bir programcık oluşturduk. **Constains()** fonksiyonunu açıklayacak olursak, **Contains** fonksiyonunun ilk parametresine kontrol edeceğimiz öğeyi giriyoruz. İkinci parametreye ise aranılacak **string** ifademizi giriyoruz. Gayet anlaşılır olduğunu düşünüyorum.\
**Strings.Count() Fonksiyonu**\
**Count()** fonksiyonu ile bir string değerin içinde istediğimiz bir string değerin kaç tane olduğunu öğrenebiliriz. Örneğimize geçelim.

```go
package main
import (
 "fmt"
 "strings"
)
func main() {
 fmt.Println(strings.Count("deneme", "e"))
}
```

**”strings”** paketini eklemeyi unutmuyoruz. Bu kodlar ile **Count()** fonksiyonunda **“deneme”** stringi içerisinde **“e”** stringinin kaç tane geçtiğini öğreniyoruz. Çıktımız **3** olacaktır.\
**Strings.Index() Fonksiyonu**\
**Index()** fonksiyonu ile bir **string** değerin içindeki istediğimiz bir string değerin kaçıncı sırada yani **index**’te olduğunu öğrenebiliriz.Sıra sıfırdan başlar. Örneğimize geçelim.

```go
package main
import (
 "fmt"
 "strings"
)
func main() {
 fmt.Println(strings.Index("Merhaba Dünya", "h"))
}
```

Çıktımız **h** harfi **0**’dan başlayarak 3. sırada olduğu için, **3** olacaktır.\
**Strings.LastIndex() Fonksiyonu**\
**LastIndex()** fonksiyonu ile bir **string** değerin içinde istediğimiz bir string değerin sırasını **Index()** fonksiyonunun tersine sağdan sola doğru kontrol eder. İlk çıkan sonucun index’ini seçer. Örnek:

```go
fmt.Println(strings.LastIndex("Merhaba Dünya", "a"))
```

**”Merhaba Dünya”** yazısının içinde **“a”** harfini aradık. **LastIndex()** fonksiyonu sondan başa yani sağdan sola arama yaptığı için sondaki **“a”** harfini buldu. Yani **13** sonucunu ekrana bastırmış olduk.\
**Strings.Title() Fonksiyonu**\
**Title()** fonksiyonu ile içerisine küçük harflerle string türünde değer girdiğimizde baş harfleri büyük harf yapan bir fonksiyondur.

```go
fmt.Println(strings.Title("merhaba dünya"))
```

Çıktımız **“Merhaba Dünya”** olacaktır.\
**Strings.ToUpper() Fonksiyonu**\
**ToUpper()** fonksiyonu içerisine girilen string değerin tüm harflerini büyük harf yapar.

```go
fmt.Println(strings.ToUpper("merhaba dünya"))
```

Çıktımız **“MERHABA DÜNYA”** olacaktır.\
**Strings.ToLower() Fonksiyonu**\
**ToLower()** fonksiyonu içerisine girilen string değerin tüm harflerini küçük harf yapar.

```go
fmt.Println(strings.ToLower("Merhaba Dünya"))
```

Çıktımız **“merhaba dünya”** olacaktır.\
**Strings.ToUpperSpecial() Fonksiyonu**\
**ToUpper()** fonksiyonu ile string değeri büyük harf yaptığımız zaman Türkçe karakter sıkıntısı yaşarız. Örnek olarak **“i”** harfi büyüyünce **“I”** harfi olur. Bunun önüne **ToUpperSpecial()** fonksiyonu ile geçebiliriz. Bu fonksiyonun ilk parametresine **karakter kodlamasını**, ikinci parametresine ise **string** değerimizi gireriz. Örnek olarak:

```go
fmt.Println(strings.ToUpperSpecial(unicode.TurkishCase, "ıiüöç"))
```

Çıktımız **“IİÜÖÇ”** olacaktır.\
**Strings.ToLowerSpecial() Fonksiyonu**\
**ToUpperSpecial()** fonksiyonu ile aynı seçilde çalışır ;fakat harfleri belirlediğiniz karakter kodlamasına göre küçültür. Örnek kullanımı:

```go
fmt.Println(strings.ToLowerSpecial(unicode.TurkishCase, "IİÜÖÇ"))
```

Çıktımız **“ıiüöç”** olacaktır.
