# Defer

Defer kelimesinin Türkçe’deki karşılığı **ertelemektir**. Bu deyimi yapacağımız işlemin başına eklersek o işlemi içerisinde bulunduğu fonksiyonun içindeki işlemlerden sonra çalıştırır. Çok karışık bir cümle kurdum ama uygulamaya geçince anlayacaksınız.

```go
package main
import "fmt"
func main() {
 defer fmt.Println("İlk Cümle")
 fmt.Println("İkinci Cümle")
}
```

Çıktımız şu şekilde olacaktır;

> İkinci Cümle
>
> İlk Cümle

Açıklamaya gelirsek ekrana **İlk Cümle** yazısını bastıran satırımızın başına **defer** terimini ekledik. **defer** eklediğimiz satır **main\(\)** fonksiyonunun içinde olduğu için **main\(\)** fonsyionundaki tüm işlemler tamamlandıktan sonra ekrana yazımızı bastırdı.  
Birden fazla defer ekleyecek olursak;

```go
package main
import "fmt"
func main() {
 defer fmt.Println("ilk Cümle")
 defer fmt.Println("İkinci Cümle")
 defer fmt.Println("Üçüncü Cümle")
 defer fmt.Println("Dördüncü Cümle")
 fmt.Println("Beşinci Cümle")
}
```

Çıktımız şu şekilde olacaktır;

> Beşinci Cümle
>
> Dördüncü Cümle
>
> Üçüncü Cümle
>
> İkinci Cümle
>
> ilk Cümle

Burdan anlıyoruz ki en baştaki defer eklenen satır en son işleme tabi tutuluyor. Hadi defer ile alakalı bir programlama alıştırması yapalım.

```go
package main
import "fmt"
func main() {
 fmt.Println("Sayıyor")
 for i := 0; i < 10; i++ {
  defer fmt.Println(i)
 }
 fmt.Println("Bitti")
}
```

Çıktımız şöyle olacaktır;

> Sayıyor
>
> Bitti
>
> 9
>
> 8
>
> 7
>
> 6
>
> 5
>
> 4
>
> 3
>
> 2
>
> 1
>
> 0



