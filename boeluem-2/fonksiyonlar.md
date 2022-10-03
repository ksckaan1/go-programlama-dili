# Fonksiyonlar

Fonksiyonlar içlerine parametre girilebilen ve işlemler yapabilen birimlerdir. Matematikteki fonksiyonlar ile aynı mantıkta çalışan bu birimlerden bir örneği inceleyelim.

```go
package main

import "fmt"

func topla(a int, b int) int {
	return a + b //a ve b’nin toplamını döndürür.
}

func main() {
	fmt.Println(topla(2, 5)) //2+5 sonucunu ekrana bastır
}
```

Yukarıdaki kodları ineleyecek olursak, foksiyonlarımızı oluşturmak için **func** anahtar kelimesini kullanırız. Yanına ise fonskiyonumuzun ismini yazarız. Parantez içine fonksiyonumuzun dışarıdan alacağı parametreler için değişken-tip tanımlaması yaparız. parantezin sağına ise fonksiyonun döndüreceği **return** değerinin tipini yazarız. Süslü parantezler içinde fonksiyonumuzun işlemleri bulunur. Son olarak return ile veri tipini belirlediğimiz değeri elde etmiş oluruz.

**Main** fonksiyonu içerisinde **topla(2,5)** fonksiyonu ile 2 ve 5 sayısının toplamını ekrana bastırmış olduk. Yani ekrana 7 sayısı verildi.

Fonksiyonlar istendiği kadar parametre alabildiği gibi, istenirse parametresiz de olabilir. Fonksiyonları veri return etmek yerine bir işlem yaptırmak içinde kullanabiliriz.

```go
package main

import "fmt"

func yazdir() {
	fmt.Println("yazı yazdırdık")
}

func main() {
	yazdir()
}
```

**yazdir** adlı fonsiyonumuzun parantezine değişken tanımlamadık ve parantezin sağına fonksiyon bloğu içerisinde **return** olmadığı için veri çıkış tipini belirtmedik. Fonksiyonumuzun içerisinde sadece ekrana yazı bastırdık.

**Fonksiyonlar Hakkında Ayrıntılı Bilgiler**

Fonksiyon parantezi içerisine değişken tanımlanırken eğer tüm değişkenlerin türleri aynı ise sadece en sağdaki değişkenin tipini belirtmeniz yeterlidir. Örnek:

```go
package main

import "fmt"

func islem(sayi int) (x, y int) { //return’un degiskenlerini tanımladık
	x = sayi / 2
	y = sayi * 2
	return //Burada sadece return yazıyor
}

func main() {
	fmt.Println(islem(10))
}
```

Yukarıda ise isimlendirilmiş **return** kullandık. return tipini yazdığımız paranteze bakacak olursa **(x, y int)** diyerek **return** edilecek verinin fonksiyonun blokları içerisinden çekilmesini sağladık. Böylece fonksiyon bloğununun sonundaki **return** kelimesinin yanına birşey yazmadık. Bu fonksiyonumuzun çıktısı ise **5 20** olacaktır.
