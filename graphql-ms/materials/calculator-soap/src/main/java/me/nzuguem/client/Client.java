package me.nzuguem.client;

import jakarta.xml.ws.Service;
import me.nzuguem.services.CalculatorService;

import javax.xml.namespace.QName;
import java.net.URI;

public class Client {

    public static void main(String[] args) throws Exception {

        var url = URI.create("http://localhost:8080/soap/calculator?wsdl").toURL();
        var qname = new QName("http://services.nzuguem.me/", "CalculatorService");

        var service = Service.create(url, qname);
        var calculator = service.getPort(CalculatorService.class);

        System.out.println("5 + 3 = " + calculator.add(5, 3));
        System.out.println("5 * 3 = " + calculator.multiply(5, 3));
    }
}
