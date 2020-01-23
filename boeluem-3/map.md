# Map

**Map**’in Türkçe karşılığında yapacağı işlemi anlatan bir çeviri olmadığı için anlamı yerine yaptığı işi bilelim. Map ile bir değişken içerisindeki dizileri bölge olarak ayırabiliriz. Çok karmaşık bir cümle oldu. O yüzden örneğimize geçelim ki anlaşılır olsun.

```go
package main
import "fmt"
type insan struct {
 kisi1, kisi2, kisi3 string
}
func main() {
 var m map[string]insan
 m = make(map[string]insan)
 m["isim"] = insan{
  "Ali", "Veli", "Ahmet",
 }
 fmt.Println(m["isim"])
}
```

Yukarıda **insan** isminde bir **struct** metodu oluşturduk ve içerisine **string** tipinde 3 tane değişken girdik. **main\(\)** fonksiyonumuz içerisinde ise **m** adında **map** kullanarak **string** değer saklayabilen **insan** tipinde değişken oluşturduk. **m** değişkenini **make** ile **map dizisi** haline getirdik. Hemen aşağısında ise **m** değişkenine **“isim”** adında bir bölge oluşturduk ve **insan** **struct**’ında belirttiğimiz gibi 3 tane **string** değer girdik. Son olarak **m** dizisinin isim bölgesindeki değerleri ekrana bastırmasını istedik. Çıktımız şöyle olacaktır;

> {Ali Veli Ahmet}

**Birden Fazla Bölge Ekleme**  
Önceki yazımızda map ile dizilere bölgesel hale getirmeyi gördük. Şimdi de birden fazla bölgeyi nasıl yapacağımızı göreceğiz. Örneğimize geçelim.

```go
package main
import "fmt"
type insan struct {
 kisi1, kisi2, kisi3 string
}
var m = map[string]insan{
 "erkekler": insan{"Ali", "Veli", "Ahmet"},
 "kadinlar": insan{"Ayşe", "Fatma", "Hayriye"},
}
func main() {
 fmt.Println(m["erkekler"])
 fmt.Println(m["kadinlar"])
 fmt.Println(m)
}
```

Yukarıda önceki örneğimizdeki gibi **insan struct**’ı oluşturduk ve içine **3** tane **string** tipinde değer atadık. **m** adında dizi oluşturduk ve **map** ile bölgeli bir dizi olduğunu belirttik. Dizinin içerisine **“erkekler”** isminde **insan** tipinde bir bölge oluşturduk ve içine **3** tane **string** tipinde değerimizi girdik. Aynı işlemi **“kadinlar”** isimli bölge içinde yaptık. **main** fonksiyonumuz içerisinde **erkekler** ve **kadinlar** bölgemizi ekrana bastırdık. Son olarak **m** dizisindeki tüm içeriği ekrana bastırık.  
Çıktımız ise şöyle olacaktır;

> {Ali Veli Ahmet}
>
> {Ayşe Fatma Hayriye}
>
> map\[erkekler:{Ali Veli Ahmet} kadinlar:{Ayşe Fatma Hayriye}\]

Burada ayrıntıyı farkedelim. **m** dizisini ekrana bastırdığımızda map yeni bölgeli bir dizi olduğunu vurguluyor. Map ile bir bakıma dizi içerisine yeni bir dizi ekliyorsunuz. Tabi bunu **struct metodu** ile yapıyoruz.

  
**Bölgesel Silme İşlemi**  
**delete** fonksiyonu ile silme işlemimizi yapabiliriz. Hemen örneğimize geçelim.

```go
package main
import "fmt"
func main() {
 m := make(map[string]int) //m isminde string bölge isimli int değer taşıyan dizi
 m["sayi"] = 25 //sayi bölgesine 25 değerini yerleştirdik
 fmt.Println(m["sayi"]) //Çıktımız: 25
 delete(m, "sayi") //sayi bölgesindeki değeri sildik
 fmt.Println(m["sayi"]) //Çıktımız: 0 (sıfır)
}
```

