# Anonim Fonksiyonlar

Anonim fonksiyonların en büyük özelliği isimsiz olmalarıdır. (Zaten adından da belli oluyor 🤔) Yazıldıkları yerde direkt olarak çalışırlar. Çalışırken diğer fonksiyonlardaki gibi parametre verilemediği için fonksiyonun sonuna parametre eklenerek çalışıtırılırlar. Örneğimizi görelim:

```go
package main

import "fmt"

func main() {
	metin := "Merhaba Dünya"

	func(a string) {
		fmt.Println(a)
	}(metin)
}

```
