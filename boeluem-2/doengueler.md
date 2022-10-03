# Döngüler

Programlama ile uğraşan arkadaşlarımızın da bileceği üzere, programlama dillerinde **while, do while** ve **for** döngüleri vardır. Bu döngüler ile yapacağımız işlemin belirli koşullarda tekrarlanmasını sağlayabiliriz. Golang’ta ise diğer dillerin aksine sadece **for** döngüsü vardır. Ama bu **while** ve **do while** ile yapılanları yapamayacağımız anlamına gelmiyor. Golang’taki for döngüsü ile hepsini yapabiliriz. Yani dilin yapımcıları tek döngü komutu ile hepsini yapabilmemize olanak sağlamışlar.

Gelelim for döngüsünün kullanımına. Go’da for döngüsü parametreleri parantez içine alınmaz.

**STANDART FOR KULLANIMI**

```go
package main

import "fmt"

func main() {
	for i := 0; i < 10; i++ {
		fmt.Println(i)
	}
}
```

**Açıklaması:**

**For** döngüsünden ayrı olarak **deger** adında **0** sayısal değerini alan bir değişken oluşturduk. **For** döngüsünde ise sadece koşul parametresini belirttlik. Yani döngü **deger** değişkeni **10** sayısından küçük olduğu zaman çalışacak. **For** kod bloğu içerisinde her döngü tekrarlandığında deger değişkeni ekrana basılacak ve deger değişkenine **+1** eklenecek.

Konsol çıktımız şu şekilde olacaktır;

> 0
>
> 1
>
> 2
>
> 3
>
> 4
>
> 5
>
> 6
>
> 7
>
> 8
>
> 9

**SADECE KOŞUL BELİRTEREK KULLANMA**

Bu **for** yazım şekli while mantığı gibi çalışır. Parametrelerde sadece koşul belirtilir.

```go
package main

import "fmt"

func main() {
	deger := 0
	for deger < 10 {
		fmt.Println(deger)
		deger++
	}
}
```

**Açıklaması:**

**For** döngüsünden ayrı olarak **deger** adında **0** sayısal değerini alan bir değişken oluşturduk. **For** döngüsünde ise sadece koşul parametresini belirttlik. Yani döngü **deger** değişkeni **10** sayısından küçük olduğu zaman çalışacak. **For** kod bloğu içerisinde her döngü tekrarlandığında deger değişkeni ekrana basılacak ve deger değişkenine **+1** eklenecek.

Konsol çıktımız şu şekilde olacaktır;

> 0
>
> 1
>
> 2
>
> 3
>
> 4
>
> 5
>
> 6
>
> 7
>
> 8
>
> 9
