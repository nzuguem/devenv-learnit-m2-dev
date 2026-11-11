package me.nzuguem.server;

import me.nzuguem.interfaces.Calculator;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class CalculatorImpl extends UnicastRemoteObject implements Calculator {

    public CalculatorImpl() throws RemoteException {
        super();
    }

    @Override
    public int add(final int a, final int b) throws RemoteException {
        IO.println("add called");
        return a + b;
    }

    @Override
    public int multiply(final int a, final int b) throws RemoteException {
        IO.println("multiply called");
        return a * b;
    }
}
