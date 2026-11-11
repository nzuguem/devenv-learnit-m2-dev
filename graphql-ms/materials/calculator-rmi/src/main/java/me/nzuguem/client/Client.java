import me.nzuguem.interfaces.Calculator;

import java.rmi.registry.LocateRegistry;

void main() {
    try {
        var registry = LocateRegistry.getRegistry("localhost");
        var cacl = (Calculator) registry.lookup("calculator");
        IO.println("3 + 3 = %d".formatted(cacl.add(3, 3)));
        IO.println("3 * 3 = %d".formatted(cacl.multiply(3, 3)));
    } catch (Exception e) {
        e.printStackTrace();
    }
}
