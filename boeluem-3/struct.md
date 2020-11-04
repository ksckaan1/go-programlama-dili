# Struct

Go programlama dilinde sınıflar yoktur. Sınıflar yerine struct'lar \(yapılar\) vardır. Yapılar sayesinde bir nesne oluşturabilir ve bu nesneye ait özellikler oluşturabiliriz. Örnek bir struct oluşturalım.

{% code title="struct örneği" %}
```go
type kişi struct {
	isim    string
	soyİsim string
	yaş     int
}
```
{% endcode %}

`type` terimi ile yeni bir tür oluşturabiliyoruz. İsmini `kişi` olarak verdik ve türünün de `struct` olacağını söyledik. Yukarıdaki şekilde bir yapı oluşturmuş olduk. Bu yapı içerisinde `isim`, `soyİsim` ve `yaş` değişkenlerine sahip. Yukarıdaki yapı üzerinden bir nesne örneği oluşturduğumuzda örneğimiz bu değişkenlere sahip olacak.

{% code title="Örnek Kullanım:" %}
```go
package main

import "fmt"

type kişi struct {
	isim    string
	soyİsim string
	yaş     int
}

func main() {

	kişi1 := kişi{"Kaan", "Kuşcu", 23}

	fmt.Println(kişi1)

}
```
{% endcode %}

`main()` fonksiyonunun içerisini incelediğimizde, `kişi1` isminde `kişi{}` yapısında bir nesne örneği oluşturuyoruz. İçerisine oluşturucu parametreler olarak `kişi struct`'ındaki sıralamayı göz önünde bulundurarak parametrelerimi giriyoruz. Daha sonra kişi1 nesne örneğini ekrana bastırıyoruz. Çıktımız aşağıdaki gibi olacaktır:

> {Kaan Kuşcu 23}

Yukarıdaki örnekte nesneyi tanımlama sırasında değer atamasını yaptık. Nesnenin alt değişkenlerine ulaşarak da tanımlama yapabilirdik.

```go
kişi1 := kişi{"Kaan", "Kuşcu", 23}
kişi1.isim = "Ahmet"
kişi1.soyİsim = "Karaca"
kişi1.yaş = 34

fmt.Println(kişi1) //{Ahmet Karaca 34}
```

Nesne örneğini oluşturuyorken parametreleri boş bırakıp sonradan da atama yapabilirdik.

```go
kişi1 := kişi{}
kişi1.isim, kişi1.soyİsim = "M. K.", "ATATÜRK"
kişi1.yaş = 999

fmt.Println(kişi1) //{M. K. ATATÜRK 999}
```

## İsim Belirterek Tanımlama

Nesneye özel değişkenleri tanımlarken değişken ismini belirterek de tanımlama yapabiliriz.

```go
kişi1 := kişi{soyİsim: "Kuşcu", isim: "Kaan", yaş: 23}

fmt.Println(kişi1) //{Kaan Kuşcu 23}
```

Değişken ismini belirterek atama yaptığımız için sıralamaya dikkat etmemiz gerekli değildir.

