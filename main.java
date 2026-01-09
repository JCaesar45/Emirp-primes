import java.util.*;

public class EmirpCalculator {
    
    public static boolean isPrime(int n) {
        if (n < 2) return false;
        if (n == 2) return true;
        if (n % 2 == 0) return false;
        for (int i = 3; i * i <= n; i += 2) {
            if (n % i == 0) return false;
        }
        return true;
    }
    
    public static int reverseNumber(int n) {
        int reversed = 0;
        while (n != 0) {
            reversed = reversed * 10 + n % 10;
            n /= 10;
        }
        return reversed;
    }
    
    public static boolean isEmirp(int n) {
        if (!isPrime(n)) return false;
        int reversed = reverseNumber(n);
        return n != reversed && isPrime(reversed);
    }
    
    public static Object emirps(int input, boolean returnAsArray) {
        List<Integer> emirpList = new ArrayList<>();
        int num = 13; // Start from the first emirp
        
        while (emirpList.size() < input) {
            if (isEmirp(num)) {
                emirpList.add(num);
            }
            num++;
        }
        
        if (returnAsArray) {
            return emirpList;
        } else {
            return emirpList.get(input - 1);
        }
    }
    
    public static Object emirps(int[] range, boolean returnAsArray) {
        if (range.length != 2) {
            throw new IllegalArgumentException("Range must have exactly 2 elements");
        }
        
        int start = range[0];
        int end = range[1];
        List<Integer> emirpList = new ArrayList<>();
        
        for (int num = start; num <= end; num++) {
            if (isEmirp(num)) {
                emirpList.add(num);
            }
        }
        
        if (returnAsArray) {
            return emirpList;
        } else {
            return emirpList.size();
        }
    }
    
    // Overloaded method for single integer input
    public static int emirps(int n) {
        return (Integer) emirps(n, false);
    }
    
    // Overloaded method for range input
    public static int emirps(int[] range) {
        return (Integer) emirps(range, false);
    }
    
    public static void main(String[] args) {
        // Test cases
        System.out.println(emirps(20, true)); // [13, 17, 31, 37, 71, 73, 79, 97, 107, 113, 149, 157, 167, 179, 199, 311, 337, 347, 359, 389]
        System.out.println(emirps(1000)); // 70529
        System.out.println(emirps(new int[]{7700, 8000}, true)); // [7717, 7757, 7817, 7841, 7867, 7879, 7901, 7927, 7949, 7951, 7963]
        System.out.println(emirps(new int[]{7700, 8000}, false)); // 11
    }
}
