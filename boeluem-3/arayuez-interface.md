# Arayüz \(Interface\)

**Arayüz** \(interface\) sayesinde fonksiyonlardan dönen değerin tipini başka bir yerde kullanmak için şekillendirebilir. Arayüzler neslere arasındaki iletişimi sağlamak için kullanılır. Daha anlaşılır olması için örnek üzerinden inceleyelim.

```go
package main
import "fmt"
type iletisim interface {
 topla() int
}
type sayilar struct {
 bir, iki int
}
func main() {
 var a iletisim
 v := sayilar{3, 4}
 a = &v
 fmt.Println(a.topla())
}
type sayi int
func (f sayi) topla() int {
 return int(f)
}
func (sayi *sayilar) topla() int {
 return sayi.bir + sayi.iki
}
```

Yazdığımız kodları inceleyelim. **iletisim** isminde **topla\(\)** fonksiyonundan **int** değer döndüren bir **interface** \(arayüz\) oluşturduk. **sayilar** adında içinde **bir** ve **iki** isminde **int** tipinde değişken barındıran bir **struct** oluşturduk. **main** fonksiyonumuzda **a** isminde **iletisim** tipinde bir değişen oluşturduk. Daha sonra **v** isminde **sayilar struct**’ı için içerisinde **bir** ve **iki** değişkenine denk gelen **int** tipinde sayılarımızı girdik. İşaretçiler konumuzda gördüğümüz yöntem ile **a** değişkenini pointer yöntemi ile **v** değişkenine işaretledik. Ekrana bastırma kısmını açıklamak için aşağıdaki fonksiyonlara değinelim. **sayi** isminde bir **int** tür oluşturduk. Altındaki **topla\(\)** fonksiyonu ile girilen sayıyı **int** tipine çeviren bir fonksiyon yazmış olduk. interface kullanmamızın ana mantığı da burada ortaya çıkıyor. **struct** ile bir tür oluşturduğumuzda içine girilen değerler **int** tipinde olsa bile dışarı çıkarılırken dizi şeklinde çıktığı için interface ile fonksiyonun **dizi** şeklinde değilde **int** tipinde veriyi kullanmasını sağlıyoruz. En son fonksiyonumuzda ise **sayilar struct**’ımızı fonksiyona dahil edip **struct**’ı **sayi** argümanı ile kullanacağımızı belirttik. Böylelikle **bir** ve **iki** değişkenine denk gelen sayıları toplayıp return edebildik. **main** fonksiyonunun son bölümünde ise ekrana toplamları bastırmış olduk. Çıktımız ise **7** olacaktır.

