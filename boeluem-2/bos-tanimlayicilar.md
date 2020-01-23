# Boş Tanımlayıcılar

Golang kodlarımızda bazen 2 adet değer döndüren fonksiyonlar kullanırız. Bu değerlerden hangisini kullanmak istemiyorsak, değişken adı yerine **\_ \(alt tire\)** kullanırız.

Örneğimizi görelim:

```go
package main

import "fmt"

func fonksiyonumuz(girdi int) (int, int) {
	işlem1 := girdi / 2
	işlem2 := girdi / 4
	return işlem1, işlem2
}

func main() {
	ikiyeböl, dördeböl := fonksiyonumuz(16)
	fmt.Println(ikiyeböl, dördeböl)
}
```

Gördüğünüz gibi fonksiyonumuzdan dönen iki değeri de değişkenlere atadık. Eğer birini atamak istemeseydik şöyle yapardık:

```go
package main

import "fmt"

func fonksiyonumuz(girdi int) (int, int) {
	işlem1 := girdi / 2
	işlem2 := girdi / 4
	return işlem1, işlem2
}

func main() {
	ikiyeböl, _ := fonksiyonumuz(16)
	fmt.Println(ikiyeböl)
}
```

Yukarıdaki kodlarımızda fonksiyonumuzun 4’e bölme özelliğini kullanmak istemediğimizden dolayı boş tanımlama işlemi yaptık.

Boş tanımlama işlemleri çoğunlukla Golang’ta programcılar tarafından hata çıktısını kullanmak istenmediğinizde yapılıyor.

