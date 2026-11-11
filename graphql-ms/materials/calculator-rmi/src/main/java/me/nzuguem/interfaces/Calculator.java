package me.nzuguem.interfaces;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface Calculator extends Remote {

    int add(final int a, final int b) throws RemoteException;
    int multiply(final int a, final int b) throws RemoteException;
}
