# Regexp \(Kurallı İfadeler\)

**Regular Expressions \(Regexp\)**, modern programlama dillerinin neredeyse hepsinde bulunan metinsel ifadelerinizin yapısını kontrol etmenizi sağlayan bir pakettir.

Bu paket sayesinde yazdığımız programda ifadelerin uygunluğunu kontrol edebilir, işimize yarayacak ifade/ifadeleri daha kolay ayırabilir ve giriş yapılan ifadeleri uygun bir düzene koyabiliriz.

Örneğimizi görelim

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	var isimKontrol = regexp.MustCompile(`^[a-z]+[0-9]$`)

	fmt.Println(isimKontrol.MatchString("kaan10")) //false
	fmt.Println(isimKontrol.MatchString("emir6"))  //true
	fmt.Println(isimKontrol.MatchString("gokhan")) //false
	fmt.Println(isimKontrol.MatchString("Altan2")) //false
	fmt.Println(isimKontrol.MatchString("8erkay")) //false
}
```

Öncelikle yukarıdaki işlemleri yapabilmemiz için, projemizde `"regexp"` paketini çağırmamız gerekiyor.

`isimKontrol` adında bir değişken oluşturduk ve bu değişkenimizde `MustCompile()` fonksiyonu ile metinsel ifademizin kurallarını belirledik.

Belirlediğimiz kural ise dizgimizin küçük harflerle a'dan z'ye kadar ve ek olarak 0'dan 9'a kadar **"rakamsal"** ifade alabileceğidir. Bu kurala uyulması için metinsel ifade ne eksik ne fazla hiçbir şey olmaması gerekir.

Kuralımızın hemen aşağısındaki örnekte ise `"kaan10"` ifadesinde sadece 0-9 arası rakam \(tek haneli\) olması gerektiği için `false` çıktısını verdi.

`"emir6"` ifade belirttiğimiz kurala uygun bir ifade olduğu için `true` çıktısını verdi.

`"gokhan"` ifadesi içerisinde sayı barındırmadığı için `false` çıktısını verdi.

`"Altan2"` ifadesi büyük harf ile başladığı için `false` çıktısını verdi.

`"8erkay"` ifadesi ise rakam sonda olması gerekirken başta olduğu için `false` çıktısını verdi.

Bu yazıda regexp nasıl yazılırdan ziyade Go'da regexp'in kullanımını anlatmak istediğimden bu kısmı kısa tutuyorum. Regexp'in nasıl yazıldığına göz atmak isteyenler için aşağıda linkini paylaşıyorum. Buyursunlar:

{% embed url="https://ceaksan.com/tr/regex-regular-expressions-nedir" %}

Bu güzel anlatım için [Ceyhun Enki Aksan](https://ceaksan.com/)'a ayrıca teşekkür ederim.

