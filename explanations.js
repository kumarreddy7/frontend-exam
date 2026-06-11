const Explanations = {
  // SET A MCQs
  'A1': 'System.Object is the root type of the unified type system in .NET. All classes, structures, and enumerations implicitly inherit from it.',
  'A2': 'A Stack uses LIFO (Last-In-First-Out) where elements are pushed and popped from the same end (the top).',
  'A3': 'Binary search repeatedly halves the search interval, resulting in O(log n) time complexity, but requires a sorted collection.',
  'A4': 'Merge Sort guarantees O(n log n) even in the worst case by consistently dividing the array in half and merging sorted halves.',
  'A5': '[Test] is the standard attribute used in NUnit to indicate that a method is a test case to be executed by the test runner.',
  'A6': 'The Action delegate represents a method that takes no parameters (or up to 16) and does not return a value (void).',
  'A7': 'In Func delegates, the final type parameter always specifies the return type of the method. So bool is the return type.',
  'A8': 'The => operator is the lambda declaration operator. It separates the input variables on the left from the lambda body on the right.',
  'A9': 'The Where method evaluates each element against a predicate and yields those for which the predicate is true.',
  'A10': 'Angle brackets <T> denote a generic type parameter in C#, allowing classes and methods to operate on various types safely.',
  'A11': 'Encapsulation hides internal state and requires all interaction to be performed through an object\'s methods or properties, enforced via access modifiers.',
  'A12': 'Interfaces define contracts (methods, properties, events) but cannot contain instance fields or concrete state.',
  'A13': 'A Dictionary uses a hash table to store Key-Value pairs, allowing fast lookups via the Key.',
  'A14': 'Linear Search must check every element in the worst case (when the target is at the end or missing), taking O(n) time.',
  'A15': 'An optimized Bubble Sort can detect if the array is already sorted in the first pass and terminate early, giving O(n) best-case time.',
  'A16': '[SetUp] marks a method to be run immediately before each test method runs, useful for initializing test data.',
  'A17': 'Predicate<T> represents a method that takes one parameter and returns a boolean, typically used for filtering.',
  'A18': 'Action<T1, T2> explicitly has two generic type parameters representing two input parameters.',
  'A19': 'Select is used for projection—transforming or shaping elements from a sequence into a new form.',
  'A20': 'List<T> is a generic collection located in the System.Collections.Generic namespace.',

  // SET B MCQs
  'B1': 'The colon (:) symbol is used to inherit from a base class or implement an interface in C#.',
  'B2': 'HashSet<T> uses a hash table to ensure all stored elements are unique, providing O(1) insertions and lookups.',
  'B3': 'Binary Search relies on comparing elements to the middle value to discard half the search space, which only works if elements are sorted.',
  'B4': 'Quick Sort divides the array into sub-arrays around a pivot and recursively sorts them, which is Divide and Conquer.',
  'B5': '[TearDown] runs after every test method to clean up resources, close connections, or reset states.',
  'B6': 'EventHandler is the standard delegate for .NET events, taking a sender object and EventArgs.',
  'B7': 'In Func delegates, the types before the final one are inputs. So string is the input parameter.',
  'B8': 'Yes, the compiler infers the types of lambda parameters based on the delegate type they are assigned to.',
  'B9': 'OrderBy sorts the elements of a sequence in ascending order based on a specified key selector.',
  'B10': 'Unlike classes (which support single inheritance), a C# class can implement any number of interfaces.',
  'B11': 'Method overriding is resolved dynamically at run-time (Dynamic/Run-time polymorphism), depending on the actual object type.',
  'B12': 'A Queue uses FIFO (First-In-First-Out). Elements are enqueued at the back and dequeued from the front.',
  'B13': 'Interpolation Search improves Binary Search for uniformly distributed data by guessing the position instead of blindly picking the middle.',
  'B14': 'Insertion Sort is extremely fast (O(n)) for small datasets or arrays that are already mostly sorted.',
  'B15': 'Assert.AreEqual(expected, actual) is the standard NUnit assertion to verify equality.',
  'B16': 'A multicast delegate holds references to more than one method. When invoked, it calls all registered methods sequentially.',
  'B17': 'Predicate<T> strictly takes exactly one parameter of type T to evaluate a condition.',
  'B18': 'FirstOrDefault returns the type\'s default value (null for reference types, 0/false for value types) if no elements are found.',
  'B19': 'The class constraint requires that the type argument T must be a reference type (class, interface, delegate, or array).',
  'B20': 'If no access modifier is specified, class members implicitly default to private.',

  // SET C MCQs
  'C1': 'Static classes cannot be instantiated. They can only contain static members and serve as utility containers.',
  'C2': 'LinkedList<T> in .NET is implemented as a Doubly Linked List, where each node has references to both next and previous nodes.',
  'C3': 'Linear Search iterates from the start to the end, so it doesn\'t require the array to be sorted.',
  'C4': 'Merge Sort requires O(n) auxiliary space to temporarily hold merged elements before copying them back to the original array.',
  'C5': '[TestCase] allows you to write parameterized tests, running the same method multiple times with different inputs.',
  'C6': 'A delegate securely encapsulates a method reference along with an object instance (if instance method), ensuring type safety.',
  'C7': 'The .NET framework defines Func delegates with up to 16 input parameters (Func<T1, ... T16, TResult>).',
  'C8': 'The => (lambda) operator is used for expression-bodied members to concisely define properties or methods with a single expression.',
  'C9': 'GroupBy groups elements that share a common key into an IGrouping collection.',
  'C10': 'The "out" keyword enables covariance, allowing you to use a more derived type than specified by the generic parameter.',
  'C11': 'The new modifier explicitly hides a member inherited from a base class, suppressing compiler warnings about hiding.',
  'C12': 'Dictionary<TKey, TValue> provides O(1) average lookup time by computing hash codes for keys.',
  'C13': 'low + (high - low) / 2 prevents potential integer overflow that can occur with (low + high) / 2 for very large indices.',
  'C14': 'Selection sort scans the unsorted portion, finds the minimum, and swaps it into the current beginning position of the unsorted segment.',
  'C15': 'Assert.Throws<ExceptionType>(() => ...) verifies that the provided lambda throws the exact exception type.',
  'C16': 'The defining characteristic of an Action delegate is that it does not return a value (void).',
  'C17': 'Yes, LINQ methods like Where heavily rely on lambda expressions passed as Func<TSource, bool> delegates.',
  'C18': 'IQueryable allows the LINQ provider (like EF Core) to translate the query into SQL and execute it on the server, saving memory.',
  'C19': 'Boxing is the process of implicitly or explicitly converting a value type (like int) to the reference type object.',
  'C20': 'Generic methods are called by specifying the type arguments in angle brackets <T> immediately after the method name.',

  // SET D MCQs
  'D1': 'Abstract methods do not provide an implementation and thus can only exist within an Abstract class or interface.',
  'D2': 'System.Collections.Concurrent contains thread-safe collections designed to be accessed from multiple threads concurrently without explicit locking.',
  'D3': 'A HashSet provides O(1) average time complexity for searching because it directly hashes the value to find its bucket.',
  'D4': 'Array.Sort uses Introspective Sort (Introsort), which begins with Quick Sort and switches to Heap Sort if recursion depth gets too large.',
  'D5': '[TestFixture] is an attribute used to mark a class that contains setup/teardown logic and test methods in NUnit.',
  'D6': 'Events are essentially a wrapper around multicast delegates, providing restricted access (only += and -= from outside the class).',
  'D7': 'The signature of Func places the return type as the very last generic parameter.',
  'D8': 'Lambda expressions provide a much more concise, readable syntax compared to older C# 2.0 anonymous method delegate blocks.',
  'D9': 'The Join method correlates the elements of two sequences based on matching keys, similar to an SQL INNER JOIN.',
  'D10': 'The "in" keyword enables contravariance, meaning you can use a less derived type than specified by the generic parameter.',
  'D11': 'A sealed class cannot be inherited by another class, ensuring its implementation cannot be altered via inheritance.',
  'D12': 'Arrays have a fixed size upon creation. List<T> dynamically allocates an internal array and resizes it as elements are added.',
  'D13': 'BFS uses a Queue to process nodes level by level (FIFO).',
  'D14': 'Merge Sort is a stable sort, meaning two elements with equal keys appear in the same order in sorted output as they did in the input.',
  'D15': '[Ignore("Reason")] marks a test method to be skipped during test execution.',
  'D16': 'Func<TResult> takes 0 input parameters and simply returns a value of type TResult.',
  'D17': 'A closure occurs when a lambda expression captures and uses local variables from its enclosing scope, prolonging their lifetime.',
  'D18': 'Yes, deferred execution means LINQ queries are not evaluated until you iterate over them (e.g., via foreach or ToList()).',
  'D19': 'Both int? and Nullable<int> represent a value type that can hold null.',
  'D20': 'The "new()" constraint ensures that the generic type argument must have an accessible, parameterless constructor so instances can be created inside generic methods.'
};

const CodingSolutions = {
  'A21': {
    optimal: `public class Solution {
    public string ReverseString(string s) {
        char[] charArray = s.ToCharArray();
        int left = 0;
        int right = s.Length - 1;
        while (left < right) {
            char temp = charArray[left];
            charArray[left] = charArray[right];
            charArray[right] = temp;
            left++; right--;
        }
        return new string(charArray);
    }
}`,
    explanation: 'The Two-Pointer approach is the most optimal. We convert the string to a character array (since strings are immutable in C#), place one pointer at the start and one at the end, and swap characters as the pointers move toward the middle.',
    time: 'O(N) - We iterate through half the string length.',
    space: 'O(N) - A new char array is allocated to hold the characters.',
    alternative: 'Alternative approach: Iterate from the end of the string and append to a `StringBuilder`. Time complexity is O(N), but it involves slightly more overhead than an in-place char array swap.'
  },
  'A22': {
    optimal: `using System;
using System.Collections.Generic;

namespace PayrollApp {
    public class Employee {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Salary { get; set; }
    }

    class Program {
        static void Main() {
            var employees = new List<Employee> {
                new Employee { Id = 1, Name = "Alice", Salary = 50000 },
                new Employee { Id = 2, Name = "Bob", Salary = 60000 }
            };

            decimal totalPayroll = 0;
            Console.WriteLine("Employee List:");
            foreach(var emp in employees) {
                Console.WriteLine($"ID: {emp.Id}, Name: {emp.Name}, Salary: {emp.Salary:C}");
                totalPayroll += emp.Salary;
            }
            Console.WriteLine($"Total Payroll: {totalPayroll:C}");
        }
    }
}`,
    explanation: 'This solution uses a List<Employee> to store employee objects. We iterate through the list to display details and calculate the sum of the salaries.',
    time: 'O(N) to calculate total payroll.',
    space: 'O(N) to store employees in the list.',
    alternative: 'A Dictionary<int, Employee> could be used for O(1) lookups by ID if editing/deleting employees was a requirement.'
  },
  'B21': {
    optimal: `public class Solution {
    public int MissingNumber(int[] nums) {
        int n = nums.Length;
        int expectedSum = n * (n + 1) / 2;
        int actualSum = 0;
        foreach (int num in nums) {
            actualSum += num;
        }
        return expectedSum - actualSum;
    }
}`,
    explanation: 'Using Gauss\' Formula for the sum of the first N numbers. We calculate the expected sum of 0 through N, then subtract the actual sum of the array. The difference is the missing number.',
    time: 'O(N) - One pass through the array.',
    space: 'O(1) - Only integer variables are used.',
    alternative: 'Bitwise XOR approach: XOR all numbers from 0 to N, and XOR them with all numbers in the array. Since X ^ X = 0, the missing number remains. Also O(N) time and O(1) space, avoiding potential integer overflow for massive N.'
  },
  'B22': {
    optimal: `using System;
using System.Collections.Generic;

namespace LibraryApp {
    class Book {
        public string Title { get; set; }
        public bool IsBorrowed { get; set; }
    }

    class Program {
        static void Main() {
            var catalog = new Dictionary<string, Book> {
                { "1984", new Book { Title = "1984", IsBorrowed = false } },
                { "Dune", new Book { Title = "Dune", IsBorrowed = false } }
            };

            // Borrowing "Dune"
            if (catalog.ContainsKey("Dune") && !catalog["Dune"].IsBorrowed) {
                catalog["Dune"].IsBorrowed = true;
                Console.WriteLine("Dune successfully borrowed.");
            } else {
                Console.WriteLine("Dune is unavailable.");
            }

            Console.WriteLine("\\nLibrary Status:");
            foreach (var b in catalog.Values) {
                Console.WriteLine($"- {b.Title}: {(b.IsBorrowed ? "Borrowed" : "Available")}");
            }
        }
    }
}`,
    explanation: 'Uses a Dictionary mapped by Title (or ISBN) for instant O(1) lookups. A boolean flag manages the state of the book without removing it from the collection.',
    time: 'O(1) for borrowing lookups, O(N) for printing the catalog.',
    space: 'O(N) to store books.',
    alternative: 'A List<Book> could be used, but lookup for borrowing would take O(N) using LINQ FirstOrDefault.'
  },
  'C21': {
    optimal: `using System.Collections.Generic;

public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        var dict = new Dictionary<int, int>();
        for (int i = 0; i < nums.Length; i++) {
            int complement = target - nums[i];
            if (dict.ContainsKey(complement)) {
                return new int[] { dict[complement], i };
            }
            if (!dict.ContainsKey(nums[i])) {
                dict.Add(nums[i], i);
            }
        }
        return new int[0];
    }
}`,
    explanation: 'Uses a Hash Map (Dictionary) to store the value and its index. As we iterate, we check if the required complement (target - current) already exists in the dictionary. If yes, we found the pair immediately.',
    time: 'O(N) - Single pass through the array.',
    space: 'O(N) - Dictionary stores at most N elements.',
    alternative: 'Brute force approach using nested loops. Check every possible pair. Time complexity O(N^2), Space O(1). Highly inefficient for large arrays.'
  },
  'C22': {
    optimal: `using System;

namespace BankApp {
    class Account {
        public decimal Balance { get; private set; }
        
        public void Deposit(decimal amount) {
            if (amount > 0) Balance += amount;
        }

        public bool Withdraw(decimal amount) {
            if (amount > 0 && Balance >= amount) {
                Balance -= amount;
                return true;
            }
            return false;
        }
    }

    class Program {
        static void Main() {
            Account acc = new Account();
            acc.Deposit(500);
            Console.WriteLine($"Deposited 500. Balance: {acc.Balance}");
            
            bool success = acc.Withdraw(600);
            Console.WriteLine($"Withdraw 600 Success: {success}. Balance: {acc.Balance}");
            
            acc.Withdraw(200);
            Console.WriteLine($"Withdraw 200 Success. Balance: {acc.Balance}");
        }
    }
}`,
    explanation: 'Encapsulates the Balance property with a private setter so it can only be modified securely via Deposit and Withdraw methods, enforcing business rules (no overdrafts).',
    time: 'O(1) for operations.',
    space: 'O(1) for memory usage.',
    alternative: 'If transaction history was required, a List<Transaction> could log every deposit/withdrawal, and balance could be calculated as the sum of transactions.'
  },
  'D21': {
    optimal: `using System.Collections.Generic;

public class Solution {
    public bool IsValid(string s) {
        Stack<char> stack = new Stack<char>();
        foreach (char c in s) {
            if (c == '(') stack.Push(')');
            else if (c == '{') stack.Push('}');
            else if (c == '[') stack.Push(']');
            else if (stack.Count == 0 || stack.Pop() != c) return false;
        }
        return stack.Count == 0;
    }
}`,
    explanation: 'A Stack is perfect for matching nested pairs. When we encounter an opening bracket, we push its corresponding closing bracket to the stack. When we see a closing bracket, we pop the stack and ensure it matches. If it doesn\'t, or the stack is empty prematurely, the string is invalid.',
    time: 'O(N) - Single pass over the string.',
    space: 'O(N) - Stack can grow to N/2 elements.',
    alternative: 'A slow alternative involves repeatedly using string.Replace("()", "") until the string stops changing. This is O(N^2) time.'
  },
  'D22': {
    optimal: `using System;
using System.Collections.Generic;

namespace AttendanceApp {
    class Program {
        static void Main() {
            var attendance = new Dictionary<string, bool> {
                { "John", false },
                { "Jane", false }
            };

            // Mark Jane present
            if (attendance.ContainsKey("Jane")) {
                attendance["Jane"] = true;
            }

            Console.WriteLine("Daily Attendance Report:");
            foreach(var kvp in attendance) {
                Console.WriteLine($"- {kvp.Key}: {(kvp.Value ? "Present" : "Absent")}");
            }
        }
    }
}`,
    explanation: 'Uses a Dictionary tracking Student Name -> Boolean status. Fast O(1) updates for marking presence.',
    time: 'O(1) for updates, O(N) for reporting.',
    space: 'O(N) for storing the roster.',
    alternative: 'Using a HashSet to store *only* present students. Space complexity becomes proportional to present students rather than total students.'
  }
};

module.exports = { Explanations, CodingSolutions };
