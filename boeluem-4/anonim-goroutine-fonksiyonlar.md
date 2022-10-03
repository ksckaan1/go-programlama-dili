# Anonim Goroutine Fonksiyonlar

Bu yazımız **Goroutine** ve **Kanallar** dersi için biraz alıştırma tadında olacak.\
&#x20;\
Daha önceki yazılarımızda belirli bir fonksiyonu **Goroutine** ile **asenkron** (eş zamanlı) olarak çalıştırmayı gördük. Bu yazımızda da **anonim** bir Goroutine fonksiyonunu göreceğiz. Bu fonksiyonun özelliği bir ismi olmaması ve asenkron olarak çalışmasıdır. Örneğimizi görelim.

```go
package main
import (
	"fmt"
	"time"
)
func main() {
	go func() {
		time.Sleep(time.Second * 2)
                fmt.Println("İlk yazımız")
	}()
	fmt.Println("İkinci yazımız")
}
```

Açıklamasına gelirsek **go func()** ile anonim bir fonksiyon oluşturduk. Bu tür fonksiyonda fonksiyonumuzun sonuna **( )** parantezlerimizi yerleştirmek zorundayız. Çünkü fonksiyonumuza parametreleri bu parantezler içerisinde yolluyoruz. Şuanlık parametre yollamadığımzın için boş kalacak. Bu fonksiyonumuz programın geri kalanı ile aynı zamanda çalışacak. Hatta programın geri kalanı ile bağlantısı bile olmayacak. Bu sebepten ötürü mantıken 2 saniye sonra işlem yapmasını belirttiğimiz için **“İkinci yazımız”** metni gözüktükten sonra **“İlk yazımız”** metni gözükeceğini tahmin etsekte **go func()** fonksiyonu yapısı gereği zaman bağımsız çalışacağı için **fmt.Println(“İkinci yazımız”)** fonksiyonu tamamlandıktan sonra **“İlk yazımız”** metni ekrana bastırılmayacaktır bile. İsterseniz programı çalıştırıp deneyebilirsiniz.\
Bunun önüne geçebilmein yolu **go func()** fonksiyonundaki işlemlerin programın çalışma zamanı içerisinde sonuç vermesidir.

```go
package main
import (
	"fmt"
	"time"
)
func main() {
	go func() {
		time.Sleep(time.Second * 2)
		fmt.Println("İlk yazımız")
	}()
	fmt.Println("İkinci yazımız")
	time.Sleep(time.Second * 3)
}
```

Yukarıdaki mantıkla çalışması için zamanı böyle ayarlamamız gerekir. Ama bu yöntem çok boş (gereksiz) bir yöntemdir. Her zaman böyle zamanı tahmin edemeyiz. Örnek olarak, **go func()** fonksiyonunda internet üzerinden bir dosyanın inmesini bekleyecek olsaydık tahmini bir zaman belirleyemezdik. Ki koskoca Windows bile belirleyemiyor. Çünkü bu internet hızımız ile alaklı bir şeydir. Bu yüzden garanti bir yöntem değildir.

\
Bundan %100 daha garantili olan yöntem **kanallar** üzerinden haberleşmektir. Çünkü bir yerde kanal ataması yapıldığında program akışının devam edebilmesi için mutlaka kanaldan gelecek verinin beklenmesi gerekir. Bu sayede zaman ile alakalı işlerde tahmin yürütmemize gerek kalmaz. Biraz uzun bir açıklama oldu ama örneğimizi görünce mantığını anlayacaksınız.

```go
package main
import (
	"fmt"
	"time"
)
func main() {
	kanal := make(chan string) //kanal oluşturuyoruz
	go func() {
		time.Sleep(time.Second * 2) //2 saniye uyku
	        kanal <- "Kanal bitti" //İletişime geçiriyoruz
		fmt.Println("Anonim fonksiyon yazısı")
	}()
	fmt.Println("Öylesine bir yazı")
	fmt.Println(<-kanal) //kanaldan gelen veri bekleniyor
}
```

Öncelikle kanal ile ilgili işlemler yapabilmek için **make** fonksiyonu ile kanal oluşturduk. Hemen altında kanalımızı iletişime sokmak için öylesine bir **string** değer yolladım.

\
**go func()** fonksiyonumuz yukarıdaki örnekler ile aynıdır. Bu fonksiyonumuzun 2 saniye beklemesi olduğundan dolayı fonksiyonumuzun altındaki **“Öylesine bir yazı”** daha önce görüntülenecek. Buraya kadar ilk örnek ile aynı olayla sonuçlanıyor. Programın sonlanmasını engellemek için **<- kanal** içinden değeri bastırarak kanal iletişimini beklemesini ve bundan dolayı **“Anonim fonksiyonu yazısı”**‘nı da beklemiş oluyoruz.\
&#x20;\
Anonim Goroutine fonksiyonları bu şekilde kullanabiliriz.
