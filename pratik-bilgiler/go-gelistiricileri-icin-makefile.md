# Go Geliştiricileri için Makefile

Golang ile yazılım geliştirirken **Makefile** teknolojisinde nasıl faydalanacağımızı göreceğiz. Gözümüzün korkmasına gerek yok, aşırı basit bir olay. Zaten herşeyi biliyorsunuz. Makefile sadece bir yöntemdir.  
 

**Makefile Nedir?**

**Makefile**, çoğu komutu çalıştırmak için kullanabileceğimiz otomasyon aracıdır. Makefile’ı genellikle Github veya Gitlab’de programların ana dizininde bazı işlemleri otomatikleştirme için kullanıldığını görebilirsiniz.  
 

**Basit Bir Örnek**

Bir proje klasörü oluşturalım ve bu klasörün içine **makefile** adında dosya oluşturalım. Daha sonra makefile dosyamızı herhangi bir editör ile açalım ve içerisine aşağıdakileri yazalım.

```python
merhaba:
    echo "merhaba"
```

Gördüğünüz gibi programlama dillerine ve komutlara benzer bir yazılımı var.  
Kodumuzu **make** komutu ile deneyebiliriz. Proje klasörümüzün içerisinde komut satırına **make merhaba** yazarak kodumuzun çıktısını görelim:

> echo "Merhaba"  
> Merhaba

Gördüğünüz gibi **make** komutunun yanına **merhaba** ekleyerek **makefile** dosyamızdaki merhaba bölümünün çalışmasını sağladık. Makefile’ın genel mantığına baktığımızda komut satırı üzerinden yaptığımız işlemleri kısaltıyor.  
 

**Basit Go Uygulaması İnşa Etme**

```go
package main
import "fmt"
func main() {
	fmt.Println("Merhaba")
}
```

Yukarıda gördüğünüz gibi basit bir Go uygulamamız var. Şimdi bu Go dosyamız ile işlem yapabilmek için **makefile** dosyamıza komutlar girelim.

```python
merhaba:
	echo "Merhaba"
build:
	go build main.go
run:
	go run main.go
```

Yukarıda gördüğünüz gibi **makefile** dosyamıza bloklar açarak bildiğiniz komut satırı komutlarını girdik. Yukarıdaki kodların durumuna göre **make build** ile Go dosyamızı build ederiz ve **make run** ile Go dosyamızı çalıştırırız. Gayet basit bir mantığı var.

**Peki bu olay bizim ne işimize yarayacak?**

Örneğin bir projeyi 3 tane platform için build etmemiz gerekecek. Her platform için ayrı Go Ortamı bilgisi girmemiz gerekir. Hele ki build işlemini sürekli yapıyorsanız bu işten bıkabilirsiniz. Fakat makefile dosyasıyla işinizi kolaylaştırabilirsiniz.  
Örneğimizi görelim:

```python
derle:
	echo "Windows, Linux ve MacOS için Derleme İşlemi"
	GOOS=windows GOARCH=amd64 go build -o bin/main-windows64.exe main.go
	GOOS=linux GOARCH=amd64 go build -o bin/main-linux64 main.go
	GOOS=darwin GOARCH=amd64 go build -o bin/main-macos64 main.go
run:
	go run main.go
hepsi: derle run
```

**derle** bloğumuzun içerisine 3 platforma derlemek için komutlarımızı girdik. **run** bloğuna ise **main.go** dosyamızı çalıştırmak için komutumuzu girdik. **hepsi** bloğunun yanına ise **derle** ve **run** yazdık. Yani komut satırına **make hepsi** yazarsak hem derleme hem de çalıştırma işlemini yapacak.  
   
Bu yazımızda **Golang için** **makefile** kullanımına örnek verdik. İlla ki Go’da kullanılacak diye bir kaide yok. Diğer programlama dillerinde veya komutlarınızı otomatize etmek istediğiniz zaman kullanabilirsiniz.

