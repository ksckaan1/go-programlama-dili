# Range

**Range**, üzerinde kullanıldığı diziyi **for** döngüsü ile tekrarlayabilir. Bir dilim range edildiğinde, tekrarlama başına iki değer döndürür (return). Birinci değer dizinin **indeksi**, ikinci değer ise bu indeksin içindeki **değerdir**. Örneğimize geçelim.

```go
package main
import "fmt"
var isimler = []string{"Ali", "Veli", "Hasan", "Ahmet", "Mehmet"}
func main() {
 for a, b := range isimler {
  fmt.Printf("%d. indeks = %s\n", a, b)
 }
}
```

Yukarıdaki yazdığımız kodları açıklayalım. **isimler** isminde içerisinde **string** tipinde değerler olan bir **dizi** oluşturduk.\
For döngümüz ile dizinimizdeki değerleri sıralayacak bir sistem oluşturduk. Döngümüzü açıklayacak olursak, bahsettiğimiz gibi dizi üzerinde uygulanan **range** terimi iki değer döndürecek olduğundan bu değerleri kullanabilmek için **a** ve **b** adında argüman belirledik. **range** **isimler** diyerek **isimler** dizisini kullanacağımızı belirttik. Ekrana bastırma bölümümüzde ise **%** işaretleri ile sağ taraftan hangi değerleri nerede kullanacağımızı belirttik.\
Çıktımız ise şu şekilde olacaktır.

> 0. indeks = Ali
> 1. indeks = Veli
> 2. indeks = Hasan
> 3. indeks = Ahmet
> 4. indeks = Mehmet
