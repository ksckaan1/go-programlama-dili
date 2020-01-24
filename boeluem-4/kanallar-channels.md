# Kanallar \(Channels\)

**Kanallar**, nesneler arasında `<-` işaretiyle veri alış-verişi yapabildiğimiz hatlardır. Kanallarıda diziler gibi `make()` ile oluşturabiliriz. `make()` fonsiyonunun dinamik kapasite oluşturması sayesinden işimiz kolaylaşır. Kanallar kullanılmadan önce oluşturulmalıdır.

```go
package main

import "fmt"

func topla(s []int, c chan int) {

  toplam := 0
  
  for _, v := range s {
    toplam += v
  }
 
  c <- toplam //toplam değerini c kanalına yolladık
}

func main() {
  s := []int{7, 2, 8, -9, 4, 0}
  c := make(chan int)
  
  go topla(s[:len(s)/2], c)
  go topla(s[len(s)/2:], c)
 
  x, y := <-c, <-c //c kanalından veri aldık
 
  fmt.Println(x, y, x+y)
}
```

`topla` adında bir fonksiyon oluşturduk. `s` adında dizi değişkeni ve `c` adında `int` tipinde bir kanal kullanacağımızı belirttik. 

Fonksiyonumuz içerisinde `toplam` adında `0` değerinde sayısal bir değişken oluşturduk. **Range**’i anlattığım dersten hatırlayacağınız üzere `range`, `for` döngüsüyle bir dizi üzerine uygulandığında 2 farklı değer döndürüyordu. Burada bize `indeks` lazım olmadığından indeks için belirleyeceğimiz değişken yerine `_` *\(alt tire\)* kullanarak kullanıma kapattık. 

Gelen değerin dizi uzunluğuyla aynı kere toplam değişkenine eklenmesini sağladık. `for` döngümüz bittikten sonra `toplam` içindeki değeri `c` kanalına yolladık.

`main()` fonksiyonumuz içerisinde `s` adında içerisinde `int` tipinde değerler barındıran bir dizi oluşturduk. `make` fonksiyonunu kullanarak `c` adında `int` tipinde bir kanal oluşturduk. `make` ile oluşturduk ki dinamik boyutta olabilsin. **go** ile farklı dilimlemeleriyle `topla` fonksiyonlarını çalıştırdık. 

Böylece goroutine’e birden fazla **thread** açtık. `c` kanalından verilerimizi alırken `x` ve `y` değişkenleri için farklı değer almış olduk. En son tüm çıktımızı ekrana bastırdık ve çıktımız bu şekilde oldu;

> -5 17 12

