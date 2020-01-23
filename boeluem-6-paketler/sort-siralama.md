# Sort \(Sıralama\)

Golang’ta dizilerin içeriğini sıralaya bileceğimiz bütünleşik olarak gelen **“sort**” isminde bir paket mevcuttur. Bu paketin kullanımı oldukça kolaydır. Örneğimizi görelim.

```go
package main
import (
	"fmt"
	"sort"
)
func main() {
	yazilar := []string{"c", "a", "b"}
	sort.Strings(yazilar)
	fmt.Println("Yazılar:", yazilar)
	sayilar := []int{7, 2, 4}
	sort.Ints(sayilar)
	fmt.Println("Sayılar:", sayilar)
	yazisirali := sort.StringsAreSorted(yazilar)
	fmt.Println("Yazılar Sıralandı mı?: ", yazisirali)
	sayisirali := sort.IntsAreSorted(sayilar)
	fmt.Println("Sayılar Sıralandı mı?:", sayisirali)
}
```

Gelelim açıklamasına;  
Sıralama özelliğini kullanabilmek için **“sort”** paketini içe aktardık. **main\(\)** fonksiyonumuzun içini inceleyelim.  
**yazilar** isminde içerisinde rastgele harflereden oluşan bir **string** dizi oluşturduk. Hemen aşağısında **sort.Strings\(yazilar\)** diyerek sıralamanın **string** türünde olduğunu belirterek sıralamamızı yaptık. Altında **yazilar** değişkenimizi ekrana bastırdık.

**sayilar** isminde içerisinde rastgele sayılar olan **int** tipinde bir dizi oluşturduk. Hemen aşağısında **sort.Ints\(sayilar\)** diyerek **int** tipinde sıralamamızı yaptık. Altında **sayilar** değişkenimizi ekrana bastırdık.  
Dizilerin sıralı olup olmadığını öğrenmek için de aşağıdaki işlemleri yaptık.  
**yazisirali** değişkeninde **sort.StringsAreSorted\(yazilar\)** fonksiyonu ile **yazilar** dizisinin sıralı olup olmama durumuna göre **bool** değer aldık. Ve sonucu ekrana bastırdık.  


**sayisirali** değişkeninde **sort.IntsAreSorted\(sayilar\)** fonksiyonu ile **sayilar** dizisinin sıralı olup olmama durumuna göre **bool** değer aldık. Ve sonucu ekrana bastırdık.  
Yukarıdaki işlemlere göre çıktımız şu şekilde olacaktır.

> Yazılar: \[a b c\]  
> Sayılar: \[2 4 7\]  
> Yazılar Sıralandı mı?: true  
> Sayılar Sıralandı mı?: true

