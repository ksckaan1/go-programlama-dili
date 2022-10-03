# Generics

Bu sayfada Go geliştiricilerin _"Go'da niye generics yok...Go'ya generics nezaman eklenecek?"_ diye diye Go dilinin yaratıcılarına adeta hayatı zindan ettiği Generic'leri inceleyeceğiz. Generics Go'nun 1.18 versiyonu ile dile dahil edildi.

Generics olmadan da uzun süre boyunca Go yazmak mümkündü tabi ki. Peki bu kadar istenilen bu yapının bize ne gibi faydaları bulunuyor bir bakalım.

Ufak bir örnek ile başlayalım.

```go
package main

import "fmt"

func main() {
	var sayı1 int = 5
	fmt.Println(arttır(sayı1))
}

func arttır(sayı int) int {
	return sayı + 1
}
```

Yukarıdaki kodlarda basit bir ekleme işlemi yapan bir fonksiyon var. Bu fonksiyonumuz `int` değer alıyor ve `int` değer döndürüyor.

Bu fonksiyonumuza `int` tipinde `sayı1` değişkenimizi verdik ve ekrana bastırdık. Neyse zaten kod basit kendini açıklıyor ama nedense ben hep bu dökümanın başından beri herşeyi açıklıyorum. Bazı arkadaşlarımız bu yüzden bana kızıyor olabilir :relaxed:

Eğer `sayı1` değişkenimiz `int` değil de `float64` tipinde olsaydı, arttır fonksiyonumuzu değiştirmemiz gerekirdi. Eğer birden fazla sayı tipi ile işlem yapacağımız durumlar olsaydı, her biri için farklı fonksiyonlar eklememiz gerekecekti.

Generic'ler ile nasıl yapabileceğimizi görelim.

```go
package main

import "fmt"

func main() {
	var sayı1 int = 5
	var sayı2 float64 = 5.3
	fmt.Println(arttır(sayı1))
	fmt.Println(arttır(sayı2))
}

func arttır[n int | float64](sayı n) n {
	return sayı + 1
}
```

`main` bloğunun içinde baktığımızda farklı değişken tipindeki 2 sayıyı aynıyı fonksiyona parametre olarak verdik.

Bunu nasıl yaptığımız büyük bir sır değil tabiki. Biraz daha aşağıya baktığımızda kendini belli ediyor. `arttır` fonksiyonunun parametre parantezlerinden önce köşeli parantez açarak, bu kısma `n` isminde `int` veya `float64` tipinde değer alabilen bir tip oluşturduk. Fonksiyonumuzun parametre parantezinde `n` tipi ile belirlediğimiz tipte değerler alabilir hale geldik.

Yukarıdaki örneğimizde oluşturduğumuz generic fonksiyonda parametre tiplerinde kısıtlama yaptık.
