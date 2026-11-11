import me.nzuguem.server.CalculatorImpl;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;

void main() {
    try {
        var cacl = new CalculatorImpl();
        var registry = LocateRegistry.createRegistry(Registry.REGISTRY_PORT);
        registry.rebind("calculator", cacl);
        IO.println("Server prêt");
    } catch (RemoteException e) {
        e.printStackTrace();
    }
}
