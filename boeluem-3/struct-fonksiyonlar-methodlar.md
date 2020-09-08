# Struct Fonksiyonlar \(Methodlar\)

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

