# Struct

Golang’ta sınıflar yoktur. Ancak, türler üzerinden metod tanımlayabiliriz. Uzatmadan örneğimize geçelim.

```go
package main
import "fmt"
type insan struct {
 isim string
 yas int
 kilo int
}
func main() {
 ali := insan{}
 ali.isim = "Ali"
 ali.yas = 20
 ali.kilo = 70
 fmt.Println(ali.isim, ali.yas, ali.kilo)
}
```

Şimdi biz yukarıda ne yaptık?  
**insan** tipinde bir **struct** ürettik ve bu struct içine **isim**, **yas** ve **kilo** isminde değişkenler atadık. Böylelikle programımıza yeni bir tür kazandırdık.  
**main\(\)** fonksiyonumuzun içinde ise, **ali** isminde **insan** dizisi oluşturduk. Böylece ali isimli nesnemiz insan türündeki tüm özelliklerden faydalabilir oldu. Hemen aşağısında ise ali’nin **isim**, **yas** ve **kilo** değerlerini atadık.  
Daha sonra ali kişisinin ismini, yaşını ve kilosunu ekrana bastırdık. Bu yönteme diğer bir tabir ile struct metodlar denir  
Çıktımız ise şöyle olacaktır;

> Ali 20 70

Struct’ın mantığını anlamamız için struct yerine başka bir tip barındıran bir örnek yapalım,

```go
package main
import "fmt"
type tamsayi int
func main() {
 var sayi tamsayi = 12
 fmt.Println(sayi)
}
```

Bu sefer tipi belirlerken struct yerine **int** tipini yazdık. Bu demek oluyor ki içerisinde **int** gibi tamsayı değer tutabilen **tamsayi** adında bir tür oluşturduk.  
main\(\) fonksiyonumuz içerisinden de görebileceğiniz üzere aynı bir değişken ataması yapar gibi **sayi** isminde **tamsayi** tipinde içerindeki değer **12** olan bir değişken tanımladık ve bunu ekrana bastırdık. Çıktımız ise tahmin edebileceğiniz üzere **12** olacaktır.

