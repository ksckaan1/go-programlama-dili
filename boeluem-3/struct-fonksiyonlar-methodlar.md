# Struct Fonksiyonlar (Methodlar)

Bu bölümde bir struct'a özel nasıl fonksiyon oluşturacağımızı göreceğiz.

Örneğimizi görelim:

```go
package main

import "fmt"

type insan struct {
	isim string
	yaş  int
}

func (i insan) tanıt() {
	fmt.Printf("Merhaba, Ben %s. %d yaşındayım.", i.isim, i.yaş)
}
func main() {
	kişi := insan{"Kaan", 23}
	kişi.tanıt()
}
```

`insan` isminde bir struct tipi oluşturduk. Bu yapımızın tıpkı insanlarda olduğu gibi `isim` ve `yaş` değişkenleri var.

Hemen aşağısında bir fonksiyon oluşturduk. Bu fonksiyonumuzun özelliği ise fonksiyonun isminden önce parantez içerisinde hangi struct'ta çalışacağını belirtmemizdir. `insan` struct'ının içerindeki değişkenlere ise `i` değişkeni ile eriştik.

Daha sonra `main` fonksiyonumuzda `kişi` isminde `insan` tipinde bir nesne oluşturduk. `kişi.tanıt()` yazarak `insan` struct tipinde oluşturduğumuz nesne için olan `tanıt` fonksiyonumuzu çalıştırdık.

Çıktımızı görelim:

> Merhaba, Ben Kaan. 23 yaşındayım.

Tabii burada, `fmt.Prtinf` fonksiyonu içerisinde kullanılan `%s` ve `%d` ifadelerinini anlamamış olabilirsiniz. Bu ifadeler, fonksiyonun ilk argümanından sonra verilen değişkenlerin karakter dizisi (string) içerisinde kullanılabilmesine olanak sağlar. Veri tipi olarak `%s` kullanıldığı durumlarda string türü verileri, `%d` kullanıldığı durumlarda ise integer türü verilerin yerleştirileceğini belirtir. Doğru veri tipi için ifade seçilmediği durumlarda program hata vermeyecek ancak doğru çalışmayacaktır.

Bu konuya, ileride `String Formatlama` bölümünde değineceğiz.
