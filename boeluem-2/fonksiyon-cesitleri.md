# Fonksiyon Çeşitleri

Golang’ta genel olarak 3 çeşit fonksiyon yapısı bulunmaktadır. Hemen bu çeşitleri görelim.

**Variadic Fonksiyonlar**

Variadic fonksiyon tipi ile fonksiyonumuza kaç tane değer girişi olduğunu belirtmeden istediğiniz kadar değer girebilirsiniz.

Hemen örneğimize geçelim.

```go
package main

import "fmt"

func toplama(sayilar ...int) int {
    toplam := 0
    for _, n := range sayilar {
        toplam += n
    }
    return toplam
}

func main() {
    fmt.Println(toplama(3, 4, 5, 6)) //18
}
```

Yukarıdaki fonksiyonumuzu inceleyelim. Vereceğimiz sayıları toplaması için aşağıda **toplama** adında bir fonksiyon oluşturduk. Fonksiyonun parametresi içerisine, yani parantezler içerisine, **sayilar** isminde **int** tipinde bir değişken tanımladık. **…** (üç nokta) ile istediğimiz kadar değer alabileceğini belirttik. **toplam** değerini mantıken doğru değer vermesi için **0** yaptık. Çünkü her sayıyı toplam değikeninin üzerine ekleyecek.

**range**’in buradaki kullanım amacından bahsedeyim. **range**’i **for** döngüsü ile kullandığımızda işlem yaptığımız öğenin uzunluğuna göre işlemimizi sürdürürüz. Yani fonksiyonumuzun içine ne kadar sayı eklersek işlemimiz ona göre şekillenecektir. For ve Range işlemini daha sonraki bölümümüzde göreceğiz.

**Range** kullanımında **\_, n** şeklinde değişken tanımlamamızın sebebi, birinci değişken yani **\_**, dizinin indeksini yani sıra numarasını verir. Bizim bununla bir işimiz olmadığı için **\_** koyarak kullanmayacağımızı belirttik. İkinci değişken ise yani **n** dizinin içindeki değeri verir yani fonksiyona girdiğimiz sayıları. Sonuç olarak bu fonksiyonda **return** ile **for** işleminden sonra tüm sayıların toplamını döndürüp **main()** fonksiyonu içerisinde ekrana bastırmış olduk.

**Closure (Atanmış) Fonksiyonlar**

Closure fonksiyonlar ile değişkenlerimizi fonksiyon olarak tanımlayabiliriz. Buradan anlamamız gereken şey fonksiyonların da atanabilen veri tipleri olduğudur. Örneğimize geçelim.

```go
package main

import "fmt"

func main() {
    toplam := func(x, y int) int {
        return x + y
    }
    fmt.Println(toplam(2, 3))
}
```

Yukarıdaki kodlarımızı inceleyecek olursak, **main** fonksiyonunun içine **toplam** adında bir değişken oluşturduk. Bu değişkenin türünün otomatik algılanması için **:=** işaretlerimizi girdik. Değişkene değer olarak anonim bir fonksiyon (ismi olmayan fonksiyon yani) yazdık. Bu fonksiyon **x** ve **y** adında iki tane **int** değer alıyor ve **return** kısmında bu iki değeri **int** olarak döndürüyor. Aşağıdaki **Println()** fonksiyonunda ise bu değişkeni aynı bir fonksiyonmuşcasına kullandık.

Atanmış fonksiyonlar yöntemine benzer olarak, bir fonksiyon ile fonksiyon tipinde veri döndürerek de atayabiliriz.

```go
package main

import "fmt"

func main() {
	p := yazdır()

	p("Merhaba Dünya")

}

func yazdır() func(s string) {
	return func(s string) {
		fmt.Println(s)
	}
}
```

**Recursive (İç-içe) Fonksiyonlar**

Recursive fonksiyonlar yazdığımız fonksiyonun içinde aynı fonksiyonu kullanmamız demektir. Fonksiyonumun tüm işlemler bittiğinde return olur. Örneğimize geçelim.

```go
package main

import "fmt"

func main() {
    fmt.Println(faktoriyel(4))
}

func faktoriyel(a uint) uint {
    if a == 0 {
        return 1
    }
    return a * faktoriyel(a-1)
}
```

Yukarıdaki fonksiyon ile bir sayının faktöriyelini hesaplayabiliriz. Faktöriyel hakkında kısaca bir hatırlatma yapayım. Belirlediğimiz sayıya kadar olan tüm sayıların sırasıyla çarpımınına o sayının faktöriyeli denir. Yani 4 sayısının faktöriyelini bulmak istiyorsak: 1\_2\_3\*4 işlemini yaparız. Sonuç 24’tür.

Faktöriyel fonksiyonun giriş ve çıkış tiplerini uint yapmamızın sebebi ise faktöriyel sonucunu bulmak için en geriye gidildiğinde eksi değerlere geçilmemesi içindir. Ayrıca sıfırın faktöriyeli birdir. Onun için değer sıfırsa bir return etmesini istedik. Faktöriyel fonksiyonunun en alttaki return kısmında girdiğimiz sayı ile girdiğimiz sayının bir eksiğinin faktöriyelini çarpacak. Girdiğimiz sayının bir küçüğünü bulmak içinse yeniden o sayının faktöriyelini hesaplayacak. Daha sonra aynı işlemler bu sayılar içinde yapılacak, ta ki sayı sona gelene yani en küçük uint değeri olan 0’a dayanana kadar. Daha sonra sonucu main fonksiyonu içerisinde ekrana bastırdık.
