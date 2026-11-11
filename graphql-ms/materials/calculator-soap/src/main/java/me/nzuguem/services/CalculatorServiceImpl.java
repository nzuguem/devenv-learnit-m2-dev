package me.nzuguem.services;

import jakarta.jws.WebMethod;
import jakarta.jws.WebService;

@WebService(serviceName = "CalculatorService")
public class CalculatorServiceImpl implements CalculatorService{

    @WebMethod
    @Override
    public int add(final int a, final int b) {
        return a + b;
    }

    @WebMethod
    @Override
    public int multiply(final int a, final int b) {
        return a * b;
    }
}
