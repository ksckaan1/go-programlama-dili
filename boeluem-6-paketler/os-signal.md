---
description: https://golang.org/pkg/os/signal/ sayfasından çeviridir.
---

# os/signal

**os/signal** paketi gelen sinyallere erişim sağlar. Genellikle Unix-benzeri sistemlerde kullanılır. **Windows** ve **Plan9**'da kullanımı farklıdır.

## Sinyal Türleri

**SIGKILL** ve **SIGSTOP** sinyalleri bir program tarafından yakalanmayabilir ve bu nedenle bu paketten etkilenemez.

Senkron sinyaller, program yürütmedeki hatalarla tetiklenen sinyallerdir: **SIGBUS**, **SIGFPE** ve **SIGSEGV**. Bunlar, `os.Process.Kill` veya **kill** programı veya benzer bir mekanizma kullanılarak gönderildiklerinde değil, yalnızca program yürütülmesinden kaynaklandığında eşzamanlı olarak kabul edilir. Genel olarak, aşağıda tartışılanlar dışında, Go programları eşzamanlı bir sinyali çalışma zamanı paniğine dönüştürecektir.

Kalan sinyaller asenkron sinyallerdir. Program hataları tarafından tetiklenmezler, bunun yerine çekirdekten veya başka bir programdan gönderilirler.

Asenkron sinyallerden, **SIGHUP** sinyali, bir program kontrol terminalini kaybettiğinde gönderilir. **SIGINT** sinyali, kontrol terminalindeki kullanıcı, varsayılan olarak ^ C (Kontrol-C) olan kesme karakterine bastığında gönderilir. **SIGQUIT** sinyali, kontrol terminalindeki kullanıcı varsayılan olarak ^  (Kontrol-Ters Taksim) olan çıkış karakterine bastığında gönderilir. Genel olarak, bir programın ^ C'ye basarak çıkmasına neden olabilir ve ^  tuşuna basarak bir yığın dökümü ile çıkmasına neden olabilirsiniz.

## Go Programlarında Sinyallerin Varsayılan Davranışı

Varsayılan olarak, senkronize bir sinyal çalışma zamanı paniğine dönüştürülür. **SIGHUP**, **SIGINT** veya **SIGTERM** sinyali programın çıkmasına neden olur. **SIGQUIT**, **SIGILL**, **SIGTRAP**, **SIGABRT**, **SIGSTKFLT**, **SIGEMT** veya **SIGSYS** sinyali, programın yığın dökümü ile çıkmasına neden olur. Bir **SIGTSTP**, **SIGTTIN** veya **SIGTTOU** sinyali sistem varsayılan davranışını alır (bu sinyaller kabuk tarafından iş kontrolü için kullanılır). **SIGPROF** sinyali, `runtime.CPUProfile`'ı uygulamak için doğrudan Go çalışma zamanı tarafından işlenir. Diğer sinyaller yakalanacak ancak herhangi bir işlem yapılmayacaktır.

Go programı, **SIGHUP** veya **SIGINT** göz ardı edilerek başlatılırsa (sinyal işleyici **SIG\_IGN**'a ayarlı), bunlar ihmal edilmiş olarak kalacaktır.

Go programı boş olmayan bir sinyal maskesi ile başlatılırsa, bu genellikle kabul edilir. Bununla birlikte, bazı sinyaller açıkça engellenmiştir: eşzamanlı sinyaller, **SIGILL**, **SIGTRAP**, **SIGSTKFLT**, **SIGCHLD**, **SIGPROF** ve **GNU/Linux**'ta **32 (SIGCANCEL)** ve **33 (SIGSETXID)** **(SIGCANCEL ve SIGSETXID)** sinyalleri **glibc** tarafından dahili olarak kullanılır. `Os.Exec` veya `os/exec` paketi tarafından başlatılan alt işlemler, değiştirilmiş sinyal maskesini miras alır.

## Go Programlarında Sinyallerin Davranışını Değiştirme

Bu paketteki işlevler, bir programın Go programlarının sinyalleri işleme şeklini değiştirmesine izin verir.

**Notify**, belirli bir eşzamansız sinyal kümesi için varsayılan davranışı devre dışı bırakır ve bunun yerine bunları bir veya daha fazla kayıtlı kanal üzerinden iletir. Özellikle, **SIGHUP**, **SIGINT**, **SIGQUIT**, **SIGABRT** ve **SIGTERM** sinyalleri için geçerlidir. Bu aynı zamanda iş kontrol sinyalleri **SIGTSTP**, **SIGTTIN** ve **SIGTTOU** için de geçerlidir ve bu durumda sistem varsayılan davranışı oluşmaz. Aynı zamanda, başka şekilde hiçbir eyleme neden olmayan bazı sinyaller için de geçerlidir: **SIGUSR1**, **SIGUSR2**, **SIGPIPE**, **SIGALRM**, **SIGCHLD**, **SIGCONT**, **SIGURG**, **SIGXCPU**, **SIGXFSZ**, **SIGVTALRM**, **SIGWINCH**, **SIGIO**, **SIGPWR**, **SIGSIGTHEZW**, **SIGTHAW**, **SIGLOST**, **SIGXRES**, **SIGJVM1**, **SIGJVM2** ve sistemde kullanılan gerçek zamanlı sinyaller. Bu sinyallerin tümünün tüm sistemlerde mevcut olmadığını unutmayın.

Program **SIGHUP** veya **SIGINT** göz ardı edilerek başlatılmışsa ve her iki sinyal için de **Notify** çağrılırsa, bu sinyal için bir sinyal işleyici kurulacak ve artık göz ardı edilmeyecektir. Daha sonra bu sinyal için **Reset** veya **Ignore** çağrılırsa veya o sinyal için **Notify**'ye iletilen tüm kanallarda **Stop** çağrılırsa, sinyal bir kez daha yok sayılır. **Reset**, sinyal için sistemin varsayılan davranışını geri yüklerken, **Ignore**, sistemin sinyali tamamen yok saymasına neden olur.

Program boş olmayan bir sinyal maskesi ile başlatılırsa, bazı sinyallerin blokajı yukarıda açıklandığı gibi açıkça kaldırılacaktır. Engellenen bir sinyal için **Notify** çağrılırsa, engellemesi kaldırılır. Daha sonra bu sinyal için **Reset** çağrılırsa veya bu sinyal için **Notify**'ye iletilen tüm kanallarda **Stop** çağrılırsa, sinyal bir kez daha engellenecektir.

## Windows

Windows'ta a ^ C (Control-C) veya ^ BREAK (Control-Break) normalde programın çıkmasına neden olur. `Os.Interrupt` için **Notify** çağrılırsa, ^ C veya ^ BREAK `os.Interrupt`'ın kanala gönderilmesine neden olur ve program çıkmaz. **Notify**'ye geçen tüm kanallarda **Reset** çağrılırsa veya **Stop** çağrılırsa, varsayılan davranış geri yüklenir.

## Plan9

Plan 9'da, sinyaller bir dizge olan `syscall.Note` türüne sahiptir. **Notify** ile bir sistem çağrısı çağırmak, bu dize bir not olarak gönderildiğinde bu değerin kanala gönderilmesine neden olur.

## Örnek Uygulama

{% code title="main.go" %}
```go
package main

import (
	"fmt"
	"os"
	"os/signal"
	"time"
)

func main() {
	//os.Signal tipinde değer taşıyan bir kanal oluşturduk
	signalKanalı := make(chan os.Signal, 1)

	/*
	* Ana iş parçacığı sonlanmaması için bir kanal
	* oluşturalım.
	 */
	programBitti := make(chan bool)

	/*
	* os.Interrupt sinyali ile programramın sonlanması
	* yerine sinyali signalKanalı'na yönlendirelim.
	 */
	signal.Notify(signalKanalı, os.Interrupt)

	/*
	* asenkron olarak signalKanalı'nı dinleyelim. Sinyal
	* geldiğinde yani CTRL + C'ye basıldığında for döngüsü
	* içerisindeki kodlar çalışacak.
	 */
	go func() {
		for range signalKanalı {
			fmt.Println("Kontrol + C 'ye basıldı")

			//5 sn bekleyelim.
			time.Sleep(time.Second * 5)

			/*
			* Burada bekleyerek size programın CTRL + C'ye
			* basıldığında kapanmadığını gösteriyorum :)
			 */
			fmt.Println("bitti")

			/*
			* Kanala değer göndererek ana iş parçacığındaki
			* programBitti kanalının bekleyişine son verelim.
			 */
			programBitti <- true
		}

	}()

	//Ana iş parçacığı sonlanmasın diye kanalı bekleyelim
	<-programBitti
}

```
{% endcode %}

## Örnek: Tüm Sinyalleri Yakalamak

```go
package main

import (
	"fmt"
	"os"
	"os/signal"
)

func main() {
	//Sinyallerin gönderileceği kanalı oluşturalım.
	kanal1 := make(chan os.Signal, 1)

	//Gelen sinyalleri kanal1'e yönlendirelim
	signal.Notify(kanal1)

	// kanal1'e sinyal gelene kadar programı bekletelim.
	sinyalTürü := <-kanal1
	fmt.Println("Sinyal Türü:", sinyalTürü)
}
```

