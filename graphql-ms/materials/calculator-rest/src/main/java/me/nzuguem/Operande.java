package me.nzuguem;

public record Operande(int a, int b) {

    public int add() {
        return a + b;
    }

    public int multiply() {
        return a * b;
    }
}
