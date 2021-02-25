# Cobra Paketi ile Basit CLI Yazmak

## Cobra’yı Yüklüyoruz

`$ go get -u github.com/spf13/cobra/cobra`

Yukarıdaki komutu yazarak yükleyebilirsiniz.

## 2. Projeyi Oluşturuyoruz

Şimdi Cobra CLI ile proje oluşturacağım. Projeyi aşağıdaki komutla oluşturabilirsiniz; `$ mkdir -p testApp && cd testApp` `$ cobra init --pkg-name github.com/your_user_name/testApp`

```text
kısmını kendi GitHub kullanıcı adınızla değiştirmeyi unutmayın.
Şu anda testApp klasörü içerisinde Cobra projesi oluşturulmuş olmalı.
Klasör hiyerarşisi aşağıdaki gibi olmalı:
```

. ├── cmd │ └── root.go └── main.go

```text
## 1. Projeye Komut Eklemek

Komutu, proje dizininin içine girip,
```$ cobra add start
```

şeklinde ekliyoruz. Projeye bakarsanız cmd klasörü altına start.go dosyası oluşturulduğunu göreceksiniz. start.go dosyası içine bakarsak karşımıza şu çıkacaktır. Buradaki mantık Use kısmı bu komutun kullanımı bilgisini verir mesela `testApp start` gibi. Short kısmında ise bu oluşturduğumuz komutun kısa açıklamasıdır ve Long ise uzun açıklaması anlamına gelir.

```go
var startCmd = &cobra.Command{
 Use:   "start",
 Short: "A brief description of your command",
 Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:
Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
 Run: func(cmd *cobra.Command, args []string) {
  fmt.Println("start called")
 },
}
func init() {
 rootCmd.AddCommand(startCmd)
}
```

Yukardaki kod örneğine göre Terminale,

> `$ testApp start`

yazdığımızda start komutu çalışıyor.

## 2. Arguman Girdisi Almak

Cobra, girilen arguman sayısı veya kendi belirlediğiniz kıstaslara göre argumanları kontrol edip programınızın bu kontrol sonucuna göre bir çıktı vermesine imkan veren yapılara sahiptir.Arguman kullanımına basit bir örnek verelim;

```go
func init() {
 rootCmd.AddCommand(Open)
}

var Open = &cobra.Command{
 Use:   "open ",
 Short: "open your file in term",
 Args:  cobra.MaximumNArgs(1),
 Run: func(cmd *cobra.Command, args []string) {
  name := strings.Join(args, " ")
  dosyaicerik, _ := ioutil.ReadFile(string(name))
  fmt.Println(string(dosyaicerik))
 },
}
```

Yukarda verdiğim örnekte

`$ testApp open [dosya ismi]`

şeklinde bir kullanım yaparak girdiğimiz dosya ismi yerine girilen dosyanın terminale basılmasını sağlamaktadır cat komutu gibi.

## Uygulamayı Yüklemek

Projemizi kullanmak için hep go run ya da derlemek saçma olur bunun için proje dizinine,  
`$ go install`  
komutunu yazarak projeyi yükleyebilirsiniz.  
Şimdi proje yüklemesini test etmek amaçlı aşşağıdaki komutu gireim terminale çıktı alırsanız yüklenmiş demektir.  
`$ testApp`

