# Format ve Kaçış Karakterleri

**Format Karakterleri ve Kullanım Alanları**  
Format karakterleri metinsel bir ifadede \(string\), dizgiyi formatlandırmak için kullanılır. Yani bir metinde değişken yerleri biçimlendirmeye yarar.

| Format Karakteri | Açıklama |
| :--- | :--- |
| %T | Değişkenin Tipini verir |
| %t | Boolean değeri verir |
| %d | Int \(tamsayı\) değeri verir |
| %b | Sayının binary \(ikili\) karşılığını verir |
| %c | Karakter değerini verir |
| %x | Sayının hexadecimal \(onaltılı\) karşılığını verir |
| %f | Float \(ondalıklı\) değeri verir |
| %s | String \(dizgi-metin\) değeri verir |
| %v | Değeri otomatik belirler |

Hemen bir örnek yapalım.

```go
package main

import "fmt"

func main() {
	isim := "Kaan"
	yaş := 23
	kilo := 71.3
	evli := false

	fmt.Printf("İsim: %s, Yaş: %d, Kilo: %f, Evli: %t", isim, yaş, kilo, evli)
}
```

Yukarıdaki kodlara göre şöyle bir çıktı alacaksınız:

> İsim: Kaan, Yaş: 23, Kilo: 71.300000, Evli: false

Kilo olarak girdiğimiz değer uzun olarak görüntülendi. Bunu değiştirmek için aşağıdaki yöntem uygulanır.

```go
fmt.Printf("İsim: %s, Yaş: %d, Kilo: %.1f, Evli: %t", isim, yaş, kilo, evli)
```

Yukarıdaki kodda farkedeceğiniz üzere `kilo` değişkeni için olan format karakterini `%.1f` olarak değiştirdik. Bu küşüratlı sayılarda noktadan sonra 1 karakter gelebileceğini gösteriyor. Çıktımız: `71.3` olarak değişecektir.

> İsim: Kaan, Yaş: 23, Kilo: 71.3, Evli: false

{% hint style="warning" %}
Format karakterleri **Printf** ve **Scanf** gibi fonksiyonlarda kullanılabilir. Bu fonksiyonların ortak özellikleri adında **f** harfi olmasıdır.
{% endhint %}

**Kaçış Karakterleri ve Kullanım Alanları**  
Kaçış karakterleri de format karakterleri gibi metinlere etki eder. Kaçış karakterlerini kod yazma zamanında yapamadığımız işlemler için kullanırız.

| Kaçış Karakteri | Açıklama |
| :--- | :--- |
| \a | Komut satırında zil sesi çıkartır |
| \b | Silme tuşu görevini görür |
| \f | Merdiven metin yazar |
| \n | Yeni satıra geçer |
| \r | Return eder |
| \t | Tab tuşu gibi boşluk bırakır \(4 boşluk\) |
| \v | Dikey boşluk bırakır |
| \\ | Ters-taksim yazar |
| \' | Tek tırnak yazar |
| \" | Çift tırnak yazar |

Gelelim örneğimize:

```go
fmt.Print("Bir\nİki\tÜç\\Dört")
```

Çıktımız şöle olacaktır:

> Bir
>
> İki    Üç\Dört

