package main

import (
	"fmt"
	"net/http"
)

func main() {
	port := "8000"
	klasor := ""
	fmt.Println(" ____  _   _ _   _ _   _  ____ _   _    ___  _    _   _ ____ _____ _   _ ____\n/ ___|| | | | \\ | | | | |/ ___| | | |  / _ \\| |  | | | / ___|_   _| | | |  _ \\\n\\___ \\| | | |  \\| | | | | |   | | | | | | | | |  | | | \\___ \\ | | | | | | |_) |\n ___) | |_| | |\\  | |_| | |___| |_| | | |_| | |__| |_| |___) || | | |_| |  _ < \n|____/ \\___/|_| \\_|\\___/ \\____|\\___/   \\___/|_____\\___/|____/ |_|  \\___/|_| \\_\\")
	fmt.Println("####################################################################")
	son := "####################################################################"
	fmt.Printf("Oluşturulacak portu giriniz (8000 için boş bırakın): ")
	fmt.Scanf("%s", &port)
	if port == "" {
		port = "8000"
	} else if len(port) < 4 {
		port = "8000"
		fmt.Println("Portu 4 karakterden az girdiğiniz için 8000 olarak ayarlandı")
	} else if len(port) > 4 {
		port = "8000"
		fmt.Println("Portu 4 karakterden fazla girdiğiniz için 800 olarak ayarlandı")
	}
	fmt.Printf("Klasörün ismini giriniz (/ olmadan): ")
	fmt.Scanf("%s", &klasor)
	http.Handle("/", http.FileServer(http.Dir(klasor)))
	fmt.Printf("http://localhost:%s oluşturuldu\n%s", port, son)
	http.ListenAndServe(":"+port, nil)
}
