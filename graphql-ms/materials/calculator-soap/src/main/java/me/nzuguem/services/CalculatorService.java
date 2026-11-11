package me.nzuguem.services;

import jakarta.jws.WebMethod;
import jakarta.jws.WebService;

@WebService(name = "CalculatorService", serviceName = "CalculatorService")
public interface CalculatorService {

    @WebMethod
    int add(final int a, final int b);

    @WebMethod
    int multiply(final int a, final int b);
}
