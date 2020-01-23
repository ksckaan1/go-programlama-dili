# Pointers \(İşaretçiler\)

**İşaretçiler** yani pointer’lar bir değerin bellekteki adresini tutar. Değişken atamalarında **& \(and\)** işareti değişkenin bellekteki adresini tutar. **\* \(yıldız\)** işareti ise tutulan adresteki değeri görüntüler. Tekrardan teorik kısmı kısa tutup örneğimize geçelim.

```go
package main
import "fmt"
func main() {
 i := 40
 p := &i
 fmt.Println(p) //Alacağımız benzeri çıktı: 0xc000012120
 fmt.Println(*p) //Alacağımız çıktı: 40
 *p = 35 //Dolaylı olarak i nin değerini değiştirdik
 fmt.Println(i) //Alacağımız çıktı: 35
}
```

İşaretçilerin ana görevini anlatmak gerekir ise, işaretçiler yeni bir değişken oluşturmak yerine var olan bir değişkeni işaretler ve bu değişken üzerinde işlemler yapar. Kodlar ile değişiklikler yaparak mantığını kafanızda pekiştirebilirsiniz.

