# Farklı Platformlara Build (İnşa) Etme

Golang projemizi build (inşa) ederken, yani çalıştırılabilir bir dosya üretirken **go build dosya.go** şeklinde build ederiz. Bu işlem varsayılan olarak kullanmakta olduğumuz işletim sistemi için build işlemi yapar. Yani Windows kullanıyorsak Windows’ta çalışmak üzere Linux İS kullanıyorsak Linux İS’te çalışmak üzere dosya oluşturur. Aynı şekilde sistemimizin mimarisi 32bit ise 32bit için, 64bit ise 64bit için çalıştırılabilir dosya üretir. Örnek olarak sistemimiz Windows 64bit ise oluşturduğumuz çalıştırılabilir dosya (exe dosyası) sadece Windows 64bitlerde çalışır.

Eğer farklı işletim sistemi için bir çalıştırılabilir dosya üretmek istiyorsak aşağıdaki komutu kullanmamız gerekir.

`env GOOS=hedef-sistem GOARCH=hedef-mimari go build hedef-dosya`

Örnek olarak, **main.go** dosyamızı **Windows 32bit** sistemler için build etmek istersek aşağıdaki komutları girmemiz gerekir.

`env GOOS=windows GOARCH=386 go build main.go`

Bu işlem ile main.exe adında bir dosya elde ederiz. Bu dosya Windows 32bit sistemlerde çalışabilir. Biliyorsunuz ki 32bit uygulamalar 64bit sistemlerde çalışır ;fakat 64bit uygulamalar 32bit sistemlerde çalışmaz. Onun için bir uygulama build ediyorken bunu aklınızdan çıkarmayın. Golang’ın dosya build edebildiği işletim sistemi ve mimari sayısı oldukça fazladır.

Golang’ın build edebildiği tüm işletim sistemi ve mimarilerine bakmak gerekir ise;

| GOOS      | GOARCH   |
| --------- | -------- |
| android   | arm      |
| darwin    | 386      |
| darwin    | amd64    |
| darwin    | arm      |
| darwin    | arm64    |
| dragonfly | amd64    |
| freebsd   | 386      |
| freebsd   | amd64    |
| freebsd   | arm      |
| linux     | 386      |
| linux     | amd64    |
| linux     | arm      |
| linux     | arm64    |
| linux     | ppc64    |
| linux     | ppc64le  |
| linux     | mips     |
| linux     | mipsle   |
| linux     | mips64   |
| linux     | mips64le |
| netbsd    | 386      |
| netbsd    | arm64    |
| netbsd    | arm      |
| openbsd   | 386      |
| openbsd   | arm64    |
| openbsd   | arm      |
| plan9     | 386      |
| plan9     | amd64    |
| solaris   | amd64    |
| windows   | 386      |
| windows   | amd64    |

\* Tablo harf sıralamasına göre yapılmıştır.

Birkaç örnek daha yapmak gerekirse;

**Windows 64bit Build**

`env GOOS=windows GOARCH=amd64 go build main.go`

**Linux 32bit Build**

`env GOOS=linux GOARCH=386 go build main.go`

**MacOS 64bit Build**

`env GOOS=darwin GOARCH=amd64 go build main.go`
