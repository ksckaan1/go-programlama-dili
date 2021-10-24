# Çok Satırlı String Oluşturma

Çok satırlı string oluşturmak için (\`) işaretini kullanırız. Türkçe klavyeden **alt gr** ve **virgül** tuşuna basarak bu işareti koyabilirsiniz. İşte örnek kodumuz;

```go
package main
import "fmt"
func main() {
    yazi := `Bu bir
    çok satırlı
    yazı örneğidir.
`
    fmt.Printf("%s", yazi)
}
```
