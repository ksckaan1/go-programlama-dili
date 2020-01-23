# Dilimler \(Slices\)

Dilimler bir dizideki değerlerin istediğimiz bölümünü kullanmamıza yarar. Yani diziyi bir pasta olarak düşünürsek kestiğimiz dilimi yiyoruz sadece. Örneğimize geçelim.

```go
package main
import "fmt"
func main() {
 a := [6]int{2, 3, 5, 6, 7, 9}
 fmt.Println(a) //Çıktımız: [2 3 5 6 7 9]
 var b []int = a[2:4] //Dilimleme işlemi
 fmt.Println(b) //Çıktımız: [5 6]
}
```

İnceleme kısmına geçelim. a isminde 6 tane int tipinde değer alan bir dizi oluşturduk. Çıktımızın içeriğini görmek için ekrana bastırdık. Dilimleme işlemi olarak yorum yaptığım satırda ise a dizisinde 2 ve 4 indeksi arasındaki değerleri dizi olarak b’ye kaydettik. b dizisinin içeriğini ekrana bastırdığımızda ise dilimlenmiş alanımızı gördük. Dilimleme işleminde \[ \] içerisine dilimlemenin başlayacağı ve biteceği indeksi yazarız.

**Dilim Varsayılanları \(Sıfır Değerleri\)**

```go
package main
import "fmt"
func main() {
 a := [6]int{2, 3, 5, 6, 7, 9}
 var b []int = a[:4] //Boş bırakılan indeks 0 varsayıldı
 fmt.Println(b) //Çıktımız: [2 3 5 6]
 var c []int = a[3:] //Boş bırakıldığı için 3. index ve sonrası alındı
 fmt.Println(c) //Çıktımız: [6 7 9]
}
```

**Dilim Uzunluğu ve Kapasitesi**  
Bir dilimin **uzunluk** ve **kapasite** değeri vardır. Dilimin uzunluğunu **len\(\)** fonksiyonu ile, kapasitesini ise **cap\(\)** fonksiyonu ile hesaplarız. Örneğimize geçelim.

```go
package main
import "fmt"
func main() {
 a := [6]int{2, 3, 5, 6, 7, 9}
 b := a[2:4]
 fmt.Println("a uzunluk", len(a))
 fmt.Println("a kapasite", cap(a))
 fmt.Println("a'nın içeriği", a)
 fmt.Println("b uzunluk", len(b))
 fmt.Println("b kapasite", cap(b))
 fmt.Println("b'nin içeriği", b)
}
```

b dizisi ile a dizisini dilimlediğimiz için b dizisinin kapasitesi ve uzunluğu değişti. Uzunluk dizinin içindeki değerlerin sayısıdır. Kapasite ise dizinin maksimum alabileceği değer sayısıdır. Çıktımıza bakacak olursak;

> a uzunluk 6 
>
> a kapasite 6 
>
> a'nın içeriği \[2 3 5 6 7 9\] 
>
> b uzunluk 2 
>
> b kapasite 4 
>
> b'nin içeriği \[5 6\]

**Boş Dilimler \(Nil Slices\)**  
Boş bir dilimin varsayılan \(sıfır\) değeri **nil**’dir. Örnek olarak;

```go
package main
import "fmt"
func main() {
 var a []int
 if a == nil {
  fmt.Println("Boş")
 }
}
```

Çıktısı tahmin edeceğiniz üzere **Boş** yazısı olaraktır.

  
**Make ile Dilim Oluşturma**  
Dilimler **make** fonksiyonu ile de oluşturulabilir. Dinamik büyüklükte diziler oluşturabiliriz.

```go
a := make([]int, 5)
```

Burada make fonksiyonu ile uzunluğu 5 olan a adında bir dizi oluşturduk.

```go
a := make([]int, 0, 5)
```

Burada ise make fonksiyonu ile uzunluğu 0, kapasitesi ise 5 olan a adında bir dizi oluşturduk.

  
**Dilime Ekleme Yapma**  
Bir dilime ekleme yapmak için append fonksiyonu kullanılır. Hemen bir örnek ile kullanılışını görelim.

```go
package main
import "fmt"
func main() {
 var a []string
 fmt.Println(a) //[ ]
 a = append(a, "Ali")
 a = append(a, "Veli")
 fmt.Println(a) //[Ali Veli]
}
```

a isminde string tipinde boş bir dizi oluşturduk. Hemen ardından boş olduğunu teyit etmek için a dizisini ekrana bastırdık. Daha sonra a dizisine append fonksiyonu ile “Ali” değerini ekledik. Yine aynı yöntem ile “Veli” değerini de ekledik. Son olarak a dizisinin çıktısının ekrana bastırdığımızda değerlerin eklenmiş olduğunu gördük.

```go
fmt.Println(len(a), cap(a))
```

a dizisinin uzunluk ve kapasitesine baktığımızda aşağıdaki çıktıyı alırız.

> 2 2

