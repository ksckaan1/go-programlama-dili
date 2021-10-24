# Strconv (String Çeviri)

**strconv** paketi Golang ile bütünleşik gelen string tipi ve diğer tipler arasında çevirme işlemi yapabileceğimiz bir pakettir.\


İlk olarak `“strconv”` paketimizi içe aktarıyoruz.\
Aşağıda örnek kullanımılarını ve daha açıklayıcı olması için yanlarına kullanım amaçlarını yazdım.

```go
package main
import (
	"fmt"
	"strconv"
)
func main() {
	//basit string-int arası çevirme
	sayi, _ := strconv.Atoi("-42") //string > int
	yazi := strconv.Itoa(-42)      //int > string
	//string'ten diğerlerine çevirme
	b, _ := strconv.ParseBool("true")        //string > bool
	f, _ := strconv.ParseFloat("3.1415", 64) //string > float
	i, _ := strconv.ParseInt("-42", 10, 64)  //string > int
	u, _ := strconv.ParseUint("42", 10, 64)  //string > uint
	//diğerlerinden string'e çevirme
	s1 := strconv.FormatBool(true)                 //bool > string
	s2 := strconv.FormatFloat(3.1415, 'E', -1, 64) //float > string
	s3 := strconv.FormatInt(-42, 16)               //int > string
	s4 := strconv.FormatUint(42, 16)               //uint > string
	//Ekrana Yazdırma
	fmt.Printf("sayi: %d tip: %T\n", sayi, sayi)
	fmt.Printf("yazi: %s tip: %T\n", yazi, yazi)
	fmt.Printf("b: %t tip: %T\n", b, b)
	fmt.Printf("f: %f tip: %T\n", f, f)
	fmt.Printf("i: %d tip: %T\n", i, i)
	fmt.Printf("u: %d tip: %T\n", u, u)
	fmt.Printf("%T %T %T %T", s1, s2, s3, s4)
}
```

Çıktımız şu şekilde olacaktır.

> sayi: -42 tip: int\
> yazi: -42 tip: string\
> b: true tip: bool\
> f: 3.141500 tip: float64\
> i: -42 tip: int64\
> u: 42 tip: uint64\
> string string string string
