# Arayüz \(Interface\)

**Interface**'in Go dili üzerindeki kullanımını basitçe açıklayalım. Interface struct nesnelerin, struct tipine göre ilişkili fonksiyonların çalışmasını sağlar. Detayına inmek için önce interface'in nasıl oluşturulduğuna bakalım.

{% code title="interface oluşturma" %}
```go
type hesap interface{
    hesapla()
}
```
{% endcode %}

Yukarıda ne yaptığımıza bakacak olursak, `type` ile `hesap` isminde bir `interface` oluşturduk. `hesapla()` ise `hesap` interface'imiz ile ilişkili olacak fonksiyonumuzun ismi olacak.

Interface'in belirli structlar üzerinde etki göstermesi gerekiyor. Bu struct'ları da oluşturalım.

```go
type toplam struct {
    sayı1 int
    sayı2 int
}

type çarpım struct{
    sayı1 int
    sayı2 int
}
```

Yukarıdaki yapılarla toplanılacak ve çarpılacak sayıları barından nesneler oluşturacağız. Sonrasında bu yapılara iliştirilen struct fonksiyonlar yazacağız.

Örnek olarak:

```go
işlem1 := toplam{5,10}

işlem2 := çarpım{5,10}
```

Şimdi de bu structlar için fonksiyonlar oluşturalım.

```go
func (t *toplam) hesapla() {
    fmt.Println(t.sayı1 + t.sayı2)
}

func (ç *çarpım) hesapla() {
    fmt.Println(ç.sayı1 * ç.sayı2)
}
```

Yukarıdaki oluşturduğumuz fonksiyonlarda dikkat edilmesi gereken nokta iki struct fonksiyonun da ismi interface içerisinde belirttiğimiz gibi `hesapla` olmasıdır.

İki fonksiyonda ismini aynı yapmamızın sebebi: oluşturduğumuz interface, nesnenin tipine göre hesapla fonksiyonunu çalıştırmasıdır. Yani işlem1 nesnesini hesap interface'i ile çaşıştırıldığında toplam struct'ı olduğunu algılayıp, toplam struct'ı ile ilişkili hesapla fonksiyonu çalışacaktır. Biraz karışık bir cümle olduğunun farkındayım. O yüzden işlem yaparak öğrenebiliriz.

İlk olarak interface'imizi parametre olarak alan bir fonksiyon oluşturalım.

```go
func hesapYap(h hesap){
    h.hesapla()
}
```

Yukarıda yaptığımız işlem çok basit. `hesap` interface tipini `h` değişkeni ile çağırdık. `h.hesapla()` ile fonksiyonumuzu çalıştırdık.

Gelelim interfacemizi nasıl kullandığımıza:

```go
package main

import "fmt"

type hesap interface {
    hesapla()
}

type toplam struct {
    sayı1 int
    sayı2 int
}

type çarpım struct {
    sayı1 int
    sayı2 int
}

func (t *toplam) hesapla() {
    fmt.Println(t.sayı1 + t.sayı2)
}

func (ç *çarpım) hesapla() {
    fmt.Println(ç.sayı1 * ç.sayı2)
}

func hesapYap(h hesap) {
    h.hesapla()
}

func main() {
    işlem1 := toplam{5, 10}

    işlem2 := çarpım{5, 10}


    //hesap interface'inden bir örnek oluşturalım
    var işlem hesap

    //işlem1'in adresini işlem interface'ine atayalım.
    işlem = &işlem1

    //interface toplam structı olduğunu algılayıp toplama işlemi yapcaktır.
    hesapYap((işlem))

    //işlem2'nin adresini işlem interface'ine atayalım.
    işlem = &işlem2

    //interface çarpım structı olduğunu algılayıp çarpma işlemi yapcaktır.
    hesapYap((işlem))
}
```

Özet geçmek gerekirse, en yukarıda interface'in tanımını yaptığım cümleyi aşağıya kopyala + yapıştır yapayım.

> Interface struct nesnelerin, struct tipine göre ilişkili fonksiyonların çalışmasını sağlar.

