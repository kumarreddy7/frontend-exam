const QuestionSets = {
  A: [
    { id: 'A1', type: 'mcq', title: 'What is the ultimate base class for all C# classes?', options: ['System.Object', 'System.Base', 'System.Class', 'System.Root'], correctAnswer: 'System.Object' },
    { id: 'A2', type: 'mcq', title: 'Which collection operates on a Last-In-First-Out (LIFO) principle?', options: ['Queue', 'Stack', 'List', 'HashSet'], correctAnswer: 'Stack' },
    { id: 'A3', type: 'mcq', title: 'What is the time complexity of a Binary Search on a sorted array?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctAnswer: 'O(log n)' },
    { id: 'A4', type: 'mcq', title: 'Which sorting algorithm has a worst-case time complexity of O(n log n)?', options: ['Bubble Sort', 'Insertion Sort', 'Quick Sort', 'Merge Sort'], correctAnswer: 'Merge Sort' },
    { id: 'A5', type: 'mcq', title: 'Which attribute marks a method as a test method in NUnit?', options: ['[TestMethod]', '[Test]', '[Fact]', '[TestCase]'], correctAnswer: '[Test]' },
    { id: 'A6', type: 'mcq', title: 'Which built-in delegate represents a method that takes no parameters and returns void?', options: ['Func', 'Action', 'Predicate', 'EventHandler'], correctAnswer: 'Action' },
    { id: 'A7', type: 'mcq', title: 'In Func<int, bool>, what does the bool represent?', options: ['First parameter', 'Second parameter', 'Return type', 'Exception type'], correctAnswer: 'Return type' },
    { id: 'A8', type: 'mcq', title: 'What is the lambda operator in C#?', options: ['=>', '->', '::', '~>'], correctAnswer: '=>' },
    { id: 'A9', type: 'mcq', title: 'Which LINQ method is used to filter a sequence based on a predicate?', options: ['Select', 'Where', 'Filter', 'Find'], correctAnswer: 'Where' },
    { id: 'A10', type: 'mcq', title: 'What syntax denotes a generic class in C#?', options: ['class MyClass[T]', 'class MyClass<T>', 'class MyClass(T)', 'class MyClass{T}'], correctAnswer: 'class MyClass<T>' },
    { id: 'A11', type: 'mcq', title: 'Which OOP principle is implemented using access modifiers (private, public)?', options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'], correctAnswer: 'Encapsulation' },
    { id: 'A12', type: 'mcq', title: 'Can an interface in C# contain instance fields?', options: ['Yes', 'No', 'Only if static', 'Only in C# 8+'], correctAnswer: 'No' },
    { id: 'A13', type: 'mcq', title: 'What does a Dictionary<TKey, TValue> store?', options: ['Ordered lists', 'Key-Value pairs', 'Unique singletons', 'Nodes'], correctAnswer: 'Key-Value pairs' },
    { id: 'A14', type: 'mcq', title: 'What is the worst-case time complexity of Linear Search?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correctAnswer: 'O(n)' },
    { id: 'A15', type: 'mcq', title: 'What is the best-case time complexity of an optimized Bubble Sort?', options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n^2)'], correctAnswer: 'O(n)' },
    { id: 'A16', type: 'mcq', title: 'Which NUnit attribute runs code before each test method?', options: ['[TestInitialize]', '[SetUp]', '[BeforeEach]', '[Init]'], correctAnswer: '[SetUp]' },
    { id: 'A17', type: 'mcq', title: 'What is the return type of a Predicate<T> delegate?', options: ['void', 'int', 'bool', 'T'], correctAnswer: 'bool' },
    { id: 'A18', type: 'mcq', title: 'How many input parameters does Action<T1, T2> take?', options: ['1', '2', '3', '0'], correctAnswer: '2' },
    { id: 'A19', type: 'mcq', title: 'In LINQ, what is the Select method primarily used for?', options: ['Filtering', 'Projection', 'Sorting', 'Grouping'], correctAnswer: 'Projection' },
    { id: 'A20', type: 'mcq', title: 'Which namespace contains List<T>?', options: ['System.Linq', 'System.Collections', 'System.Collections.Generic', 'System.Data'], correctAnswer: 'System.Collections.Generic' },
    { 
      id: 'A21', 
      type: 'code', 
      title: 'Logic: Reverse a String', 
      description: 'Write a C# method to reverse a string without using built-in methods like Array.Reverse or LINQ.', 
      starterCode: 'using System;\n\npublic class Solution {\n    public string ReverseString(string s) {\n        // Your logic here\n        return s;\n    }\n}' 
    },
    { 
      id: 'A22', 
      type: 'code', 
      title: 'Console App: Employee Payroll', 
      description: 'Create a Console App that manages Employee data (Id, Name, Salary). It should allow adding an employee, displaying all employees, and calculating total payroll. Use OOP concepts.', 
      starterCode: 'using System;\nusing System.Collections.Generic;\n\nnamespace PayrollApp {\n    class Program {\n        static void Main(string[] args) {\n            Console.WriteLine("Employee Payroll System");\n            // Implement your console app logic here\n        }\n    }\n}' 
    }
  ],
  B: [
    { id: 'B1', type: 'mcq', title: 'Which symbol is used for inheritance in C#?', options: [':', 'extends', '->', '::'], correctAnswer: ':' },
    { id: 'B2', type: 'mcq', title: 'Which collection is best for storing a set of unique elements?', options: ['List', 'Array', 'HashSet', 'Queue'], correctAnswer: 'HashSet' },
    { id: 'B3', type: 'mcq', title: 'What is a prerequisite for using Binary Search?', options: ['Array must be reversed', 'Array must be sorted', 'Array must have even length', 'None'], correctAnswer: 'Array must be sorted' },
    { id: 'B4', type: 'mcq', title: 'Which algorithmic paradigm does Quick Sort use?', options: ['Dynamic Programming', 'Greedy', 'Divide and Conquer', 'Backtracking'], correctAnswer: 'Divide and Conquer' },
    { id: 'B5', type: 'mcq', title: 'Which NUnit attribute runs code after each test method?', options: ['[TearDown]', '[TestCleanup]', '[AfterEach]', '[Clean]'], correctAnswer: '[TearDown]' },
    { id: 'B6', type: 'mcq', title: 'Which delegate is typically used for standard events in .NET?', options: ['Action', 'Func', 'EventHandler', 'Predicate'], correctAnswer: 'EventHandler' },
    { id: 'B7', type: 'mcq', title: 'In Func<string, int>, what is the input parameter type?', options: ['string', 'int', 'void', 'bool'], correctAnswer: 'string' },
    { id: 'B8', type: 'mcq', title: 'Does a lambda expression support type inference for parameters?', options: ['Yes', 'No', 'Only for ints', 'Only in LINQ'], correctAnswer: 'Yes' },
    { id: 'B9', type: 'mcq', title: 'Which LINQ method sorts elements in ascending order?', options: ['Sort', 'OrderBy', 'Order', 'SortBy'], correctAnswer: 'OrderBy' },
    { id: 'B10', type: 'mcq', title: 'Can a C# class implement multiple interfaces?', options: ['Yes', 'No', 'Only if they have same methods', 'Only 2 max'], correctAnswer: 'Yes' },
    { id: 'B11', type: 'mcq', title: 'Method overriding is an example of which type of polymorphism?', options: ['Compile-time', 'Run-time', 'Static', 'Ad-hoc'], correctAnswer: 'Run-time' },
    { id: 'B12', type: 'mcq', title: 'Which collection operates on a First-In-First-Out (FIFO) principle?', options: ['Stack', 'Queue', 'Dictionary', 'List'], correctAnswer: 'Queue' },
    { id: 'B13', type: 'mcq', title: 'Interpolation search is an improved variant of which algorithm?', options: ['Linear Search', 'Binary Search', 'DFS', 'BFS'], correctAnswer: 'Binary Search' },
    { id: 'B14', type: 'mcq', title: 'When is Insertion Sort highly efficient?', options: ['For huge arrays', 'For descending sorted arrays', 'For small or nearly sorted arrays', 'Never'], correctAnswer: 'For small or nearly sorted arrays' },
    { id: 'B15', type: 'mcq', title: 'How do you assert equality in NUnit?', options: ['Assert.IsEqual()', 'Assert.Equals()', 'Assert.AreEqual()', 'Assert.True()'], correctAnswer: 'Assert.AreEqual()' },
    { id: 'B16', type: 'mcq', title: 'What is a multicast delegate?', options: ['A delegate returning an array', 'A delegate invoking multiple methods', 'A multi-threaded delegate', 'A generic delegate'], correctAnswer: 'A delegate invoking multiple methods' },
    { id: 'B17', type: 'mcq', title: 'How many input parameters does a standard Predicate<T> take?', options: ['0', '1', '2', 'Unlimited'], correctAnswer: '1' },
    { id: 'B18', type: 'mcq', title: 'What does FirstOrDefault() return if a sequence is empty?', options: ['Throws exception', 'null (for ref types) / default value', 'Empty string', '-1'], correctAnswer: 'null (for ref types) / default value' },
    { id: 'B19', type: 'mcq', title: 'What does "where T : class" mean in generics?', options: ['T must be a value type', 'T must be a reference type', 'T must have a parameterless constructor', 'T is a base class'], correctAnswer: 'T must be a reference type' },
    { id: 'B20', type: 'mcq', title: 'What is the default access modifier for class members in C#?', options: ['public', 'private', 'protected', 'internal'], correctAnswer: 'private' },
    { 
      id: 'B21', 
      type: 'code', 
      title: 'Logic: Find Missing Number', 
      description: 'Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.', 
      starterCode: 'using System;\n\npublic class Solution {\n    public int MissingNumber(int[] nums) {\n        // Your logic here\n        return 0;\n    }\n}' 
    },
    { 
      id: 'B22', 
      type: 'code', 
      title: 'Console App: Library Books', 
      description: 'Create a Library Management console application. It should allow adding books, viewing all books, and borrowing a book (changing its status).', 
      starterCode: 'using System;\nusing System.Collections.Generic;\n\nnamespace LibraryApp {\n    class Program {\n        static void Main(string[] args) {\n            Console.WriteLine("Library Management System");\n            // Implement your console app logic here\n        }\n    }\n}' 
    }
  ],
  C: [
    { id: 'C1', type: 'mcq', title: 'Can a static class be instantiated using the new keyword?', options: ['Yes', 'No', 'Only internally', 'Only using reflection'], correctAnswer: 'No' },
    { id: 'C2', type: 'mcq', title: 'In C#, LinkedList<T> is implemented as a:', options: ['Singly linked list', 'Doubly linked list', 'Circular array', 'Binary tree'], correctAnswer: 'Doubly linked list' },
    { id: 'C3', type: 'mcq', title: 'Which search algorithm works on unsorted arrays?', options: ['Binary Search', 'Interpolation Search', 'Linear Search', 'Exponential Search'], correctAnswer: 'Linear Search' },
    { id: 'C4', type: 'mcq', title: 'What is the auxiliary space complexity of Merge Sort?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], correctAnswer: 'O(n)' },
    { id: 'C5', type: 'mcq', title: 'Which NUnit attribute runs a test multiple times with different arguments?', options: ['[TestCase]', '[DataRow]', '[Theory]', '[Arguments]'], correctAnswer: '[TestCase]' },
    { id: 'C6', type: 'mcq', title: 'Is a delegate best described as a type-safe function pointer?', options: ['Yes', 'No', 'Only Action delegates', 'Only generic delegates'], correctAnswer: 'Yes' },
    { id: 'C7', type: 'mcq', title: 'What is the maximum number of input parameters a Func delegate can have in .NET?', options: ['4', '8', '16', 'Unlimited'], correctAnswer: '16' },
    { id: 'C8', type: 'mcq', title: 'Which operator is used for expression-bodied members?', options: ['=>', ':', '->', '::'], correctAnswer: '=>' },
    { id: 'C9', type: 'mcq', title: 'Which LINQ method is used to group elements?', options: ['Group', 'GroupBy', 'Cluster', 'Partition'], correctAnswer: 'GroupBy' },
    { id: 'C10', type: 'mcq', title: 'Which keyword enables covariance in generic interfaces (like IEnumerable<out T>)?', options: ['in', 'out', 'ref', 'yield'], correctAnswer: 'out' },
    { id: 'C11', type: 'mcq', title: 'Which keyword explicitly hides an inherited member from a base class?', options: ['hide', 'override', 'new', 'base'], correctAnswer: 'new' },
    { id: 'C12', type: 'mcq', title: 'Which collection provides O(1) average time complexity for lookups?', options: ['List', 'LinkedList', 'Dictionary', 'Array'], correctAnswer: 'Dictionary' },
    { id: 'C13', type: 'mcq', title: 'Which formula calculates the midpoint safely to avoid overflow in Binary Search?', options: ['(low+high)/2', 'low+(high-low)/2', 'high-(low+high)/2', 'low*high/2'], correctAnswer: 'low+(high-low)/2' },
    { id: 'C14', type: 'mcq', title: 'Selection sort finds the minimum element and swaps it with the element at the...', options: ['End', 'Current beginning position', 'Middle', 'Random position'], correctAnswer: 'Current beginning position' },
    { id: 'C15', type: 'mcq', title: 'How do you assert that an exception is thrown in NUnit?', options: ['Assert.Exception()', 'Assert.Throws()', 'Assert.CatchError()', 'Assert.Fails()'], correctAnswer: 'Assert.Throws()' },
    { id: 'C16', type: 'mcq', title: 'What is the return type of the Action delegate?', options: ['void', 'int', 'bool', 'object'], correctAnswer: 'void' },
    { id: 'C17', type: 'mcq', title: 'Can you pass a lambda expression to a LINQ Where() clause?', options: ['Yes', 'No', 'Only if it takes no parameters', 'Only if compiled'], correctAnswer: 'Yes' },
    { id: 'C18', type: 'mcq', title: 'When querying a database with Entity Framework, which interface is preferred for server-side evaluation?', options: ['IEnumerable', 'IList', 'IQueryable', 'ICollection'], correctAnswer: 'IQueryable' },
    { id: 'C19', type: 'mcq', title: 'What is Boxing in C#?', options: ['Ref type to Value type', 'Value type to Ref type', 'Casting arrays', 'Packing assemblies'], correctAnswer: 'Value type to Ref type' },
    { id: 'C20', type: 'mcq', title: 'What is the correct syntax to call a generic method?', options: ['Method[T]()', 'Method<T>()', 'Method(T)()', 'Method{T}()'], correctAnswer: 'Method<T>()' },
    { 
      id: 'C21', 
      type: 'code', 
      title: 'Logic: Two Sum', 
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', 
      starterCode: 'using System;\n\npublic class Solution {\n    public int[] TwoSum(int[] nums, int target) {\n        // Your logic here\n        return new int[0];\n    }\n}' 
    },
    { 
      id: 'C22', 
      type: 'code', 
      title: 'Console App: Bank Account', 
      description: 'Build a Console App for a Bank Account. Users should be able to Deposit, Withdraw, and Check Balance. Prevent withdrawing more than the balance.', 
      starterCode: 'using System;\n\nnamespace BankApp {\n    class Program {\n        static void Main(string[] args) {\n            Console.WriteLine("Bank Account Management");\n            // Implement your console app logic here\n        }\n    }\n}' 
    }
  ],
  D: [
    { id: 'D1', type: 'mcq', title: 'An abstract method must be declared inside an...', options: ['Interface', 'Abstract class', 'Static class', 'Sealed class'], correctAnswer: 'Abstract class' },
    { id: 'D2', type: 'mcq', title: 'Which namespace contains thread-safe collections like ConcurrentDictionary?', options: ['System.Threading', 'System.Collections.Generic', 'System.Collections.Concurrent', 'System.Linq'], correctAnswer: 'System.Collections.Concurrent' },
    { id: 'D3', type: 'mcq', title: 'What is the average time complexity for searching an element in a HashSet?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'], correctAnswer: 'O(1)' },
    { id: 'D4', type: 'mcq', title: 'Which sorting algorithm is primarily used internally by Array.Sort() in .NET?', options: ['Merge Sort', 'Introspective Sort (Introsort)', 'Bubble Sort', 'Radix Sort'], correctAnswer: 'Introspective Sort (Introsort)' },
    { id: 'D5', type: 'mcq', title: 'Which NUnit attribute is used to mark a class that contains test methods?', options: ['[TestClass]', '[TestFixture]', '[TestSuite]', '[Tests]'], correctAnswer: '[TestFixture]' },
    { id: 'D6', type: 'mcq', title: 'Events in C# are fundamentally based on which language feature?', options: ['Interfaces', 'Delegates', 'Enums', 'Structs'], correctAnswer: 'Delegates' },
    { id: 'D7', type: 'mcq', title: 'In the Func delegate signature, where is the return type placed?', options: ['First parameter', 'Last parameter', 'It has no return type', 'Anywhere'], correctAnswer: 'Last parameter' },
    { id: 'D8', type: 'mcq', title: 'What is the primary advantage of Lambda Expressions over Anonymous Methods?', options: ['Faster execution', 'More concise syntax', 'Supports multiple return types', 'Uses less memory'], correctAnswer: 'More concise syntax' },
    { id: 'D9', type: 'mcq', title: 'Which LINQ method combines elements from two collections based on matching keys?', options: ['Concat', 'Merge', 'Join', 'Union'], correctAnswer: 'Join' },
    { id: 'D10', type: 'mcq', title: 'Which keyword enables contravariance in generic interfaces (like Action<in T>)?', options: ['out', 'ref', 'in', 'params'], correctAnswer: 'in' },
    { id: 'D11', type: 'mcq', title: 'What is the effect of marking a class as sealed?', options: ['It cannot be instantiated', 'It cannot be inherited', 'It cannot have methods', 'It must be static'], correctAnswer: 'It cannot be inherited' },
    { id: 'D12', type: 'mcq', title: 'What is a major difference between Array and List<T>?', options: ['Array is reference type, List is value type', 'Array has fixed size, List resizes dynamically', 'Array stores objects, List stores strings', 'No difference'], correctAnswer: 'Array has fixed size, List resizes dynamically' },
    { id: 'D13', type: 'mcq', title: 'Breadth-First Search (BFS) typically uses which collection?', options: ['Stack', 'Queue', 'Dictionary', 'HashSet'], correctAnswer: 'Queue' },
    { id: 'D14', type: 'mcq', title: 'Which of the following sorting algorithms is Stable by default?', options: ['Quick Sort', 'Selection Sort', 'Merge Sort', 'Heap Sort'], correctAnswer: 'Merge Sort' },
    { id: 'D15', type: 'mcq', title: 'How do you mark a test to be skipped in NUnit?', options: ['[Skip]', '[Ignore]', '[Disable]', '[Omit]'], correctAnswer: '[Ignore]' },
    { id: 'D16', type: 'mcq', title: 'How many input parameters does Func<TResult> take?', options: ['1', '2', '0', 'Unlimited'], correctAnswer: '0' },
    { id: 'D17', type: 'mcq', title: 'What is a closure in the context of lambdas?', options: ['Closing a database connection', 'A lambda capturing outer variables', 'A self-executing lambda', 'A lambda with no body'], correctAnswer: 'A lambda capturing outer variables' },
    { id: 'D18', type: 'mcq', title: 'Does LINQ use deferred (lazy) execution for methods like Where and Select?', options: ['Yes', 'No', 'Only for arrays', 'Only in C# 10'], correctAnswer: 'Yes' },
    { id: 'D19', type: 'mcq', title: 'What is the syntax for a nullable value type in C#?', options: ['int?', 'Nullable<int>', 'Both A and B', 'int!'], correctAnswer: 'Both A and B' },
    { id: 'D20', type: 'mcq', title: 'What does the constraint "where T : new()" require?', options: ['T must be a new class', 'T must be allocated on the heap', 'T must have a public parameterless constructor', 'T must be abstract'], correctAnswer: 'T must have a public parameterless constructor' },
    { 
      id: 'D21', 
      type: 'code', 
      title: 'Logic: Valid Parentheses', 
      description: 'Given a string containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.', 
      starterCode: 'using System;\nusing System.Collections.Generic;\n\npublic class Solution {\n    public bool IsValid(string s) {\n        // Your logic here\n        return false;\n    }\n}' 
    },
    { 
      id: 'D22', 
      type: 'code', 
      title: 'Console App: Student Attendance', 
      description: 'Build a Student Attendance System in a Console App. Allow marking students present or absent and viewing the attendance report for the day.', 
      starterCode: 'using System;\nusing System.Collections.Generic;\n\nnamespace AttendanceApp {\n    class Program {\n        static void Main(string[] args) {\n            Console.WriteLine("Student Attendance System");\n            // Implement your console app logic here\n        }\n    }\n}' 
    }
  ]
};

QuestionSets.SETS = ['A', 'B', 'C', 'D'];
