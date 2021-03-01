# Switch

Switch kelimesinin Türkçe’deki anlamı **anahtardır**. Switch deyimi de if-else deyimi gibi koşul üzerine çalışır. Yine teorik kısmı geçip anlaşılır olması için örnek yapalım. **case** deyimi durumu ifade eder. Koşul sağlandığı zaman işleme devam edilmez.

```go
package main
import "fmt"
func main() {
 i := 5
 switch i {
  case 5:
   fmt.Println("i eşittir 5")
  case 10:
   fmt.Println("i eşittir 10")
  case 15:
   fmt.Println("i eşittir 15")
 }
}
```

Çıktımız şu şekilde olacaktır;

> i eşittir 5

Switch’te koşulların gerçekleşmediği zaman işlem uygulamak istiyorsak bunu **default** terimi ile yaparız. Örnek;

```go
i := 5
switch i {
 case 5:
  fmt.Println("i eşittir 5")
 default:
  fmt.Println("i bilinmiyor")
}
```

### **Koşulsuz Switch**

Switch’in tanımını daha iyi anlayabilmeniz için koşulsuz switch kullanımına örnek verelim. Bu yöntemde switch deyiminin yanına koşul girmek yerine case deyiminin yanına koşul giriyoruz.

```go
package main
import "fmt"
func main() {
 i := 5
 switch {
  case i == 5: //i=5 olduğu için diğer case’ler sorgulanmaz
   fmt.Println("i eşittir 5")
  case i < 10:
   fmt.Println("i küçüktür 10")
  case i > 3:
   fmt.Println("i büyüktür 3")
 }
}
```

Çıktımız şu şekilde olacaktır;

> i eşittir 5

### Sonraki Koşulu Kontrol Ettirme

Durumlar içerisinde kontrol etmemiz gereken başka durumlarda olabilir. Bunun için **fallthrough** deyimini kullanabiliriz.

```go
package main

import "fmt"

func main() {
	x := 5
	switch {
	case x == 5:
		fmt.Println("x 5'tir")
		fallthrough
	case x < 10:
		fmt.Println("x 10'dan küçüktür")

	}
}
```

Çıktımız aşağıdaki gibi olacaktır.

> x 5'tir  
> x 10'dan küçüktür

### Switch'e Özel Değişken Tanımlama

Tıpkı If deyimindeki Switch içerisinde kullanabileceğimiz değişkenler tanımlayabiliriz.

```go
switch x := 5; {
	case x == 5:
		fmt.Println("x 5'tir")
	case x < 10:
		fmt.Println("x 10'dan küçüktür")
}
```

