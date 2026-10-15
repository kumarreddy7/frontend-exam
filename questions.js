/**
 * questions.js
 * 15 Verified Infosys 2026 Batch Pseudo-Code Questions
 * Sections: Nested Loops (Q1-Q5), Recursion (Q6-Q10), Bitwise Operations (Q11-Q15)
 */

const ExamQuestions = [
  // ═══════════════════════════════════════════════════════════════════
  // SECTION 1: NESTED LOOPS (Questions 1 to 5)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 1,
    sectionId: "nested_loops",
    sectionTitle: "Nested Loops",
    title: "Question 1: Nested Loops with Modulo Condition",
    prompt: "What will be the output of the following pseudocode?",
    pseudocode: `Integer i, j, count
Set count = 0
for i from 1 to 4
    for j from 1 to i
        if((i + j) mod 2 == 0) then
            count = count + (i * j)
        else
            count = count + 1
        end if
    end for
end for
print count`,
    options: [
      { key: "A", text: "41" },
      { key: "B", text: "45" },
      { key: "C", text: "38" },
      { key: "D", text: "52" }
    ],
    correctAnswer: "B",
    correctText: "45",
    explanation: `
      <div class="exp-section">
        <strong>Execution Walkthrough:</strong>
        <ul>
          <li><strong>i = 1:</strong>
            <ul>
              <li>j = 1: (1 + 1) = 2 is even &rarr; count = 0 + (1 &times; 1) = <strong>1</strong></li>
            </ul>
          </li>
          <li><strong>i = 2:</strong>
            <ul>
              <li>j = 1: (2 + 1) = 3 is odd &rarr; count = 1 + 1 = <strong>2</strong></li>
              <li>j = 2: (2 + 2) = 4 is even &rarr; count = 2 + (2 &times; 2) = <strong>6</strong></li>
            </ul>
          </li>
          <li><strong>i = 3:</strong>
            <ul>
              <li>j = 1: (3 + 1) = 4 is even &rarr; count = 6 + (3 &times; 1) = <strong>9</strong></li>
              <li>j = 2: (3 + 2) = 5 is odd &rarr; count = 9 + 1 = <strong>10</strong></li>
              <li>j = 3: (3 + 3) = 6 is even &rarr; count = 10 + (3 &times; 3) = <strong>19</strong></li>
            </ul>
          </li>
          <li><strong>i = 4:</strong>
            <ul>
              <li>j = 1: (4 + 1) = 5 is odd &rarr; count = 19 + 1 = <strong>20</strong></li>
              <li>j = 2: (4 + 2) = 6 is even &rarr; count = 20 + (4 &times; 2) = <strong>28</strong></li>
              <li>j = 3: (4 + 3) = 7 is odd &rarr; count = 28 + 1 = <strong>29</strong></li>
              <li>j = 4: (4 + 4) = 8 is even &rarr; count = 29 + (4 &times; 4) = <strong>45</strong></li>
            </ul>
          </li>
        </ul>
        <p><strong>Final Output:</strong> <code>count = 45</code>.</p>
      </div>
    `
  },
  {
    id: 2,
    sectionId: "nested_loops",
    sectionTitle: "Nested Loops",
    title: "Question 2: Decrement Step Loop with Break",
    prompt: "What will be the output of the following pseudocode?",
    pseudocode: `Integer i, j, total
Set total = 0
for i from 1 to 5 step 1
    for j from 10 down to 4 step 2
        if((i + j) > 12) then
            total = total + i
            break
        end if
        total = total + j
    end for
end for
print total`,
    options: [
      { key: "A", text: "56" },
      { key: "B", text: "68" },
      { key: "C", text: "74" },
      { key: "D", text: "62" }
    ],
    correctAnswer: "B",
    correctText: "68",
    explanation: `
      <div class="exp-section">
        <strong>Execution Walkthrough:</strong>
        <p>Inner loop values for <code>j</code> are <code>10, 8, 6, 4</code>.</p>
        <ul>
          <li><strong>i = 1:</strong>
            <ul>
              <li>j = 10: (1 + 10) = 11 &le; 12 &rarr; total = 0 + 10 = 10</li>
              <li>j = 8: (1 + 8) = 9 &le; 12 &rarr; total = 10 + 8 = 18</li>
              <li>j = 6: (1 + 6) = 7 &le; 12 &rarr; total = 18 + 6 = 24</li>
              <li>j = 4: (1 + 4) = 5 &le; 12 &rarr; total = 24 + 4 = <strong>28</strong></li>
            </ul>
          </li>
          <li><strong>i = 2:</strong>
            <ul>
              <li>j = 10: (2 + 10) = 12 &le; 12 &rarr; total = 28 + 10 = 38</li>
              <li>j = 8: (2 + 8) = 10 &le; 12 &rarr; total = 38 + 8 = 46</li>
              <li>j = 6: (2 + 6) = 8 &le; 12 &rarr; total = 46 + 6 = 52</li>
              <li>j = 4: (2 + 4) = 6 &le; 12 &rarr; total = 52 + 4 = <strong>56</strong></li>
            </ul>
          </li>
          <li><strong>i = 3:</strong>
            <ul>
              <li>j = 10: (3 + 10) = 13 &gt; 12 &rarr; total = 56 + 3 = <strong>59</strong>, <em>break inner loop!</em></li>
            </ul>
          </li>
          <li><strong>i = 4:</strong>
            <ul>
              <li>j = 10: (4 + 10) = 14 &gt; 12 &rarr; total = 59 + 4 = <strong>63</strong>, <em>break inner loop!</em></li>
            </ul>
          </li>
          <li><strong>i = 5:</strong>
            <ul>
              <li>j = 10: (5 + 10) = 15 &gt; 12 &rarr; total = 63 + 5 = <strong>68</strong>, <em>break inner loop!</em></li>
            </ul>
          </li>
        </ul>
        <p><strong>Final Output:</strong> <code>total = 68</code>.</p>
      </div>
    `
  },
  {
    id: 3,
    sectionId: "nested_loops",
    sectionTitle: "Nested Loops",
    title: "Question 3: Nested While Loops with Variable Reinitialization",
    prompt: "What will be the output of the following pseudocode?",
    pseudocode: `Integer p, q, r
Set p = 1, r = 0
while(p <= 3)
    q = 3
    while(q >= 1)
        if((p + q) mod 3 == 0) then
            r = r + (p * 2)
        else
            r = r + q
        end if
        q = q - 1
    end while
    p = p + 1
end while
print r`,
    options: [
      { key: "A", text: "18" },
      { key: "B", text: "21" },
      { key: "C", text: "24" },
      { key: "D", text: "27" }
    ],
    correctAnswer: "C",
    correctText: "24",
    explanation: `
      <div class="exp-section">
        <strong>Execution Walkthrough:</strong>
        <p>In each outer iteration of <code>p</code>, <code>q</code> resets to 3 and counts down to 1.</p>
        <ul>
          <li><strong>p = 1:</strong>
            <ul>
              <li>q = 3: (1 + 3) mod 3 = 1 &ne; 0 &rarr; r = 0 + 3 = 3</li>
              <li>q = 2: (1 + 2) mod 3 = 0 &rarr; r = 3 + (1 &times; 2) = 5</li>
              <li>q = 1: (1 + 1) mod 3 = 2 &ne; 0 &rarr; r = 5 + 1 = <strong>6</strong></li>
            </ul>
          </li>
          <li><strong>p = 2:</strong>
            <ul>
              <li>q = 3: (2 + 3) mod 3 = 2 &ne; 0 &rarr; r = 6 + 3 = 9</li>
              <li>q = 2: (2 + 2) mod 3 = 1 &ne; 0 &rarr; r = 9 + 2 = 11</li>
              <li>q = 1: (2 + 1) mod 3 = 0 &rarr; r = 11 + (2 &times; 2) = <strong>15</strong></li>
            </ul>
          </li>
          <li><strong>p = 3:</strong>
            <ul>
              <li>q = 3: (3 + 3) mod 3 = 0 &rarr; r = 15 + (3 &times; 2) = 21</li>
              <li>q = 2: (3 + 2) mod 3 = 2 &ne; 0 &rarr; r = 21 + 2 = 23</li>
              <li>q = 1: (3 + 1) mod 3 = 1 &ne; 0 &rarr; r = 23 + 1 = <strong>24</strong></li>
            </ul>
          </li>
        </ul>
        <p><strong>Final Output:</strong> <code>r = 24</code>.</p>
      </div>
    `
  },
  {
    id: 4,
    sectionId: "nested_loops",
    sectionTitle: "Nested Loops",
    title: "Question 4: Dependent Inner Loop Boundaries",
    prompt: "What will be the output of the following pseudocode?",
    pseudocode: `Integer m, n, ans
Set ans = 0
for m from 1 to 3
    for n from m to 4
        if((m * n) mod 2 != 0) then
            ans = ans + (m + n)
        else
            ans = ans + (n - m)
        end if
    end for
end for
print ans`,
    options: [
      { key: "A", text: "16" },
      { key: "B", text: "20" },
      { key: "C", text: "24" },
      { key: "D", text: "18" }
    ],
    correctAnswer: "B",
    correctText: "20",
    explanation: `
      <div class="exp-section">
        <strong>Execution Walkthrough:</strong>
        <p>The inner loop index <code>n</code> starts at <code>m</code> and runs up to 4.</p>
        <ul>
          <li><strong>m = 1 (n = 1 to 4):</strong>
            <ul>
              <li>n = 1: 1 &times; 1 = 1 (odd) &rarr; ans = 0 + (1 + 1) = 2</li>
              <li>n = 2: 1 &times; 2 = 2 (even) &rarr; ans = 2 + (2 - 1) = 3</li>
              <li>n = 3: 1 &times; 3 = 3 (odd) &rarr; ans = 3 + (1 + 3) = 7</li>
              <li>n = 4: 1 &times; 4 = 4 (even) &rarr; ans = 7 + (4 - 1) = <strong>10</strong></li>
            </ul>
          </li>
          <li><strong>m = 2 (n = 2 to 4):</strong>
            <ul>
              <li>n = 2: 2 &times; 2 = 4 (even) &rarr; ans = 10 + (2 - 2) = 10</li>
              <li>n = 3: 2 &times; 3 = 6 (even) &rarr; ans = 10 + (3 - 2) = 11</li>
              <li>n = 4: 2 &times; 4 = 8 (even) &rarr; ans = 11 + (4 - 2) = <strong>13</strong></li>
            </ul>
          </li>
          <li><strong>m = 3 (n = 3 to 4):</strong>
            <ul>
              <li>n = 3: 3 &times; 3 = 9 (odd) &rarr; ans = 13 + (3 + 3) = 19</li>
              <li>n = 4: 3 &times; 4 = 12 (even) &rarr; ans = 19 + (4 - 3) = <strong>20</strong></li>
            </ul>
          </li>
        </ul>
        <p><strong>Final Output:</strong> <code>ans = 20</code>.</p>
      </div>
    `
  },
  {
    id: 5,
    sectionId: "nested_loops",
    sectionTitle: "Nested Loops",
    title: "Question 5: Multi-Branch State Accumulator",
    prompt: "What will be the output of the following pseudocode?",
    pseudocode: `Integer i, j, res
Set res = 1
for i from 1 to 3
    for j from 1 to 3
        if(i == j) then
            res = res + (i * j)
        else if(i > j) then
            res = res + (i - j)
        else
            res = res + (j - i) * 2
        end if
    end for
end for
print res`,
    options: [
      { key: "A", text: "23" },
      { key: "B", text: "27" },
      { key: "C", text: "31" },
      { key: "D", text: "25" }
    ],
    correctAnswer: "B",
    correctText: "27",
    explanation: `
      <div class="exp-section">
        <strong>Execution Walkthrough:</strong>
        <p>Initial: <code>res = 1</code>. Evaluates 9 combinations of (i, j):</p>
        <ul>
          <li><strong>i = 1:</strong>
            <ul>
              <li>j = 1: i == j &rarr; res = 1 + (1 &times; 1) = 2</li>
              <li>j = 2: i &lt; j &rarr; res = 2 + (2 - 1) &times; 2 = 4</li>
              <li>j = 3: i &lt; j &rarr; res = 4 + (3 - 1) &times; 2 = <strong>8</strong></li>
            </ul>
          </li>
          <li><strong>i = 2:</strong>
            <ul>
              <li>j = 1: i &gt; j &rarr; res = 8 + (2 - 1) = 9</li>
              <li>j = 2: i == j &rarr; res = 9 + (2 &times; 2) = 13</li>
              <li>j = 3: i &lt; j &rarr; res = 13 + (3 - 2) &times; 2 = <strong>15</strong></li>
            </ul>
          </li>
          <li><strong>i = 3:</strong>
            <ul>
              <li>j = 1: i &gt; j &rarr; res = 15 + (3 - 1) = 17</li>
              <li>j = 2: i &gt; j &rarr; res = 17 + (3 - 2) = 18</li>
              <li>j = 3: i == j &rarr; res = 18 + (3 &times; 3) = <strong>27</strong></li>
            </ul>
          </li>
        </ul>
        <p><strong>Final Output:</strong> <code>res = 27</code>.</p>
      </div>
    `
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: RECURSION (Questions 6 to 10)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 6,
    sectionId: "recursion",
    sectionTitle: "Recursion",
    title: "Question 6: Recursive Call Stack Unwinding",
    prompt: "What is the return value of fun(4, 3) for the following function?",
    pseudocode: `function fun(Integer a, Integer b)
    if(a <= 0 or b <= 0) then
        return a + b
    end if
    if(a > b) then
        return fun(a - 2, b) + a
    else
        return fun(a, b - 1) + b
    end if
end function`,
    options: [
      { key: "A", text: "9" },
      { key: "B", text: "12" },
      { key: "C", text: "14" },
      { key: "D", text: "10" }
    ],
    correctAnswer: "B",
    correctText: "12",
    explanation: `
      <div class="exp-section">
        <strong>Execution Call Stack:</strong>
        <ol>
          <li><code>fun(4, 3)</code>: Since 4 &gt; 3, calls <code>fun(2, 3) + 4</code></li>
          <li><code>fun(2, 3)</code>: Since 2 &le; 3, calls <code>fun(2, 2) + 3</code></li>
          <li><code>fun(2, 2)</code>: Since 2 &le; 2, calls <code>fun(2, 1) + 2</code></li>
          <li><code>fun(2, 1)</code>: Since 2 &gt; 1, calls <code>fun(0, 1) + 2</code></li>
          <li><code>fun(0, 1)</code>: Base case! Since <code>a &le; 0</code>, returns <code>0 + 1 = 1</code></li>
        </ol>
        <strong>Unwinding the Stack:</strong>
        <ul>
          <li><code>fun(2, 1) = 1 + 2 = 3</code></li>
          <li><code>fun(2, 2) = 3 + 2 = 5</code></li>
          <li><code>fun(2, 3) = 5 + 3 = 8</code></li>
          <li><code>fun(4, 3) = 8 + 4 = 12</code></li>
        </ul>
        <p><strong>Final Return Value:</strong> <code>12</code>.</p>
      </div>
    `
  },
  {
    id: 7,
    sectionId: "recursion",
    sectionTitle: "Recursion",
    title: "Question 7: Parity-Based Branching Recursion",
    prompt: "What will be the return value of solve(6)? (Note: / denotes integer division)",
    pseudocode: `function solve(Integer n)
    if(n <= 1) then
        return 1
    end if
    if(n mod 2 == 0) then
        return solve(n - 1) + solve(n / 2)
    else
        return solve(n - 1) + 2
    end if
end function`,
    options: [
      { key: "A", text: "10" },
      { key: "B", text: "12" },
      { key: "C", text: "14" },
      { key: "D", text: "8" }
    ],
    correctAnswer: "B",
    correctText: "12",
    explanation: `
      <div class="exp-section">
        <strong>Bottom-Up Evaluation:</strong>
        <ul>
          <li><code>solve(1) = 1</code> (Base case)</li>
          <li><code>solve(2)</code> (Even): <code>solve(1) + solve(1) = 1 + 1 = 2</code></li>
          <li><code>solve(3)</code> (Odd): <code>solve(2) + 2 = 2 + 2 = 4</code></li>
          <li><code>solve(4)</code> (Even): <code>solve(3) + solve(2) = 4 + 2 = 6</code></li>
          <li><code>solve(5)</code> (Odd): <code>solve(4) + 2 = 6 + 2 = 8</code></li>
          <li><code>solve(6)</code> (Even): <code>solve(5) + solve(3) = 8 + 4 = 12</code></li>
        </ul>
        <p><strong>Final Return Value:</strong> <code>12</code>.</p>
      </div>
    `
  },
  {
    id: 8,
    sectionId: "recursion",
    sectionTitle: "Recursion",
    title: "Question 8: Multi-Branch Tree Recursion",
    prompt: "What is the return value of calc(3, 3) for the following function?",
    pseudocode: `function calc(Integer x, Integer y)
    if(x < 1) then
        return y
    end if
    if(y < 1) then
        return x
    end if
    return calc(x - 1, y - 2) + calc(x - 2, y - 1) + (x * y)
end function`,
    options: [
      { key: "A", text: "12" },
      { key: "B", text: "15" },
      { key: "C", text: "17" },
      { key: "D", text: "21" }
    ],
    correctAnswer: "B",
    correctText: "15",
    explanation: `
      <div class="exp-section">
        <strong>Expression Expansion:</strong>
        <p><code>calc(3, 3) = calc(2, 1) + calc(1, 2) + (3 &times; 3)</code></p>
        <strong>Sub-problem 1: <code>calc(2, 1)</code></strong>
        <ul>
          <li><code>calc(2, 1) = calc(1, -1) + calc(0, 0) + (2 &times; 1)</code></li>
          <li><code>calc(1, -1)</code>: <code>y &lt; 1</code> &rarr; returns <code>x = 1</code></li>
          <li><code>calc(0, 0)</code>: <code>x &lt; 1</code> &rarr; returns <code>y = 0</code></li>
          <li><code>calc(2, 1) = 1 + 0 + 2 = <strong>3</strong></code></li>
        </ul>
        <strong>Sub-problem 2: <code>calc(1, 2)</code></strong>
        <ul>
          <li><code>calc(1, 2) = calc(0, 0) + calc(-1, 1) + (1 &times; 2)</code></li>
          <li><code>calc(0, 0)</code>: <code>x &lt; 1</code> &rarr; returns <code>y = 0</code></li>
          <li><code>calc(-1, 1)</code>: <code>x &lt; 1</code> &rarr; returns <code>y = 1</code></li>
          <li><code>calc(1, 2) = 0 + 1 + 2 = <strong>3</strong></code></li>
        </ul>
        <strong>Combine:</strong>
        <p><code>calc(3, 3) = 3 + 3 + 9 = 15</code>.</p>
      </div>
    `
  },
  {
    id: 9,
    sectionId: "recursion",
    sectionTitle: "Recursion",
    title: "Question 9: Recursion with In-Function Variable Mutation",
    prompt: "What is the return value of check(1, 4, 3)?",
    pseudocode: `function check(Integer a, Integer b, Integer c)
    if((a + b) < (c + b)) then
        a = a + 1
        c = c - 1
        return check(a + 1, b, c) + a
    else if((c + a) > (b + a)) then
        b = b + 2
        return check(a, b - 1, c - 2) + b
    else
        return a + b + c
    end if
end function`,
    options: [
      { key: "A", text: "9" },
      { key: "B", text: "11" },
      { key: "C", text: "13" },
      { key: "D", text: "15" }
    ],
    correctAnswer: "B",
    correctText: "11",
    explanation: `
      <div class="exp-section">
        <strong>Trace Step-by-Step:</strong>
        <ol>
          <li><strong>First Call: <code>check(1, 4, 3)</code></strong>
            <ul>
              <li>Condition 1: <code>(1 + 4) &lt; (3 + 4) &rarr; 5 &lt; 7</code> (TRUE).</li>
              <li>Local mutations execute:
                <code>a = 1 + 1 = 2</code>,
                <code>c = 3 - 1 = 2</code>.
              </li>
              <li>Returns: <code>check(a + 1, b, c) + a = check(3, 4, 2) + 2</code>.</li>
            </ul>
          </li>
          <li><strong>Second Call: <code>check(3, 4, 2)</code></strong>
            <ul>
              <li>Condition 1: <code>(3 + 4) &lt; (2 + 4) &rarr; 7 &lt; 6</code> (FALSE).</li>
              <li>Condition 2: <code>(2 + 3) &gt; (4 + 3) &rarr; 5 &gt; 7</code> (FALSE).</li>
              <li>Else branch executes: returns <code>a + b + c = 3 + 4 + 2 = <strong>9</strong></code>.</li>
            </ul>
          </li>
          <li><strong>Unwind First Call:</strong>
            <code>9 + 2 = 11</code>.
          </li>
        </ol>
        <p><strong>Final Return Value:</strong> <code>11</code>.</p>
      </div>
    `
  },
  {
    id: 10,
    sectionId: "recursion",
    sectionTitle: "Recursion",
    title: "Question 10: Nested Function Invocation in Recursion",
    prompt: "What will be the return value of mystery(5)?",
    pseudocode: `function mystery(Integer n)
    if(n <= 2) then
        return n + 1
    end if
    if(n mod 2 == 0) then
        return mystery(mystery(n - 2)) - 1
    else
        return mystery(n - 1) + mystery(n - 3)
    end if
end function`,
    options: [
      { key: "A", text: "4" },
      { key: "B", text: "6" },
      { key: "C", text: "7" },
      { key: "D", text: "9" }
    ],
    correctAnswer: "B",
    correctText: "6",
    explanation: `
      <div class="exp-section">
        <strong>Bottom-Up Base Computations:</strong>
        <ul>
          <li><code>mystery(0) = 0 + 1 = 1</code></li>
          <li><code>mystery(1) = 1 + 1 = 2</code></li>
          <li><code>mystery(2) = 2 + 1 = 3</code></li>
        </ul>
        <strong>Evaluating For Larger <code>n</code>:</strong>
        <ul>
          <li><strong>n = 3 (Odd):</strong>
            <code>mystery(3) = mystery(2) + mystery(0) = 3 + 1 = <strong>4</strong></code>
          </li>
          <li><strong>n = 4 (Even):</strong>
            <code>mystery(4) = mystery(mystery(2)) - 1 = mystery(3) - 1 = 4 - 1 = <strong>3</strong></code>
          </li>
          <li><strong>n = 5 (Odd):</strong>
            <code>mystery(5) = mystery(4) + mystery(2) = 3 + 3 = <strong>6</strong></code>
          </li>
        </ul>
        <p><strong>Final Return Value:</strong> <code>6</code>.</p>
      </div>
    `
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 3: BITWISE OPERATIONS (Questions 11 to 15)
  // ═══════════════════════════════════════════════════════════════════
  {
    id: 11,
    sectionId: "bitwise",
    sectionTitle: "Bitwise Operations",
    title: "Question 11: Compound Bitwise Expressions & Shifts",
    prompt: "What will be the output of the following pseudocode?",
    pseudocode: `Integer a, b, c
Set a = 12, b = 7
c = (a & b) ^ (a | b)
c = c >> 2
print c`,
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "2" },
      { key: "C", text: "3" },
      { key: "D", text: "4" }
    ],
    correctAnswer: "B",
    correctText: "2",
    explanation: `
      <div class="exp-section">
        <strong>Bitwise Analysis:</strong>
        <ul>
          <li>Binary representations:
            <code>a = 12 = 1100<sub>2</sub></code>,
            <code>b = 7 = 0111<sub>2</sub></code>.
          </li>
          <li><code>a & b = 1100<sub>2</sub> & 0111<sub>2</sub> = 0100<sub>2</sub> = 4</code></li>
          <li><code>a | b = 1100<sub>2</sub> | 0111<sub>2</sub> = 1111<sub>2</sub> = 15</code></li>
          <li><code>(a & b) ^ (a | b) = 4 ^ 15 = 0100<sub>2</sub> ^ 1111<sub>2</sub> = 1011<sub>2</sub> = 11</code>
            <br><em>(Notice: In Boolean algebra, <code>(x & y) ^ (x | y)</code> is mathematically identical to <code>x ^ y</code> = 12 ^ 7 = 11).</em>
          </li>
          <li>Right shift: <code>c = 11 >> 2 = &lfloor;11 / 4&rfloor; = <strong>2</strong></code></li>
        </ul>
        <p><strong>Final Output:</strong> <code>2</code>.</p>
      </div>
    `
  },
  {
    id: 12,
    sectionId: "bitwise",
    sectionTitle: "Bitwise Operations",
    title: "Question 12: Bitwise Loop with Dynamic Masking",
    prompt: "What will be the output of the following pseudocode?",
    pseudocode: `Integer x, y, res
Set x = 20, y = 3, res = 0
while(x > 0)
    if((x & 1) != 0) then
        res = res ^ (y << 1)
    else
        res = res + (y >> 1)
    end if
    x = x >> 1
    y = y + 1
end while
print res`,
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "6" },
      { key: "C", text: "10" },
      { key: "D", text: "12" }
    ],
    correctAnswer: "A",
    correctText: "2",
    explanation: `
      <div class="exp-section">
        <strong>Iteration Trace:</strong>
        <p><code>x = 20 = 10100<sub>2</sub></code> (runs for 5 bit-shifts):</p>
        <ol>
          <li><code>x = 20</code> (LSB 0): <code>res = 0 + (3 >> 1) = 0 + 1 = 1</code> &rarr; <code>x = 10, y = 4</code></li>
          <li><code>x = 10</code> (LSB 0): <code>res = 1 + (4 >> 1) = 1 + 2 = 3</code> &rarr; <code>x = 5, y = 5</code></li>
          <li><code>x = 5</code> (LSB 1): <code>res = 3 ^ (5 << 1) = 3 ^ 10 = 0011<sub>2</sub> ^ 1010<sub>2</sub> = 1001<sub>2</sub> = 9</code> &rarr; <code>x = 2, y = 6</code></li>
          <li><code>x = 2</code> (LSB 0): <code>res = 9 + (6 >> 1) = 9 + 3 = 12</code> &rarr; <code>x = 1, y = 7</code></li>
          <li><code>x = 1</code> (LSB 1): <code>res = 12 ^ (7 << 1) = 12 ^ 14 = 1100<sub>2</sub> ^ 1110<sub>2</sub> = 0010<sub>2</sub> = 2</code> &rarr; <code>x = 0, y = 8</code></li>
        </ol>
        <p>Loop finishes as <code>x = 0</code>. <strong>Final Output:</strong> <code>res = 2</code>.</p>
      </div>
    `
  },
  {
    id: 13,
    sectionId: "bitwise",
    sectionTitle: "Bitwise Operations",
    title: "Question 13: Bitwise Operator Precedence Hierarchy",
    prompt: "What will be the output of the following pseudocode?",
    pseudocode: `Integer a, b, c, ans
Set a = 5, b = 3, c = 8
ans = a ^ b & c + 2
print ans`,
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "5" },
      { key: "C", text: "7" },
      { key: "D", text: "0" }
    ],
    correctAnswer: "C",
    correctText: "7",
    explanation: `
      <div class="exp-section">
        <strong>Operator Precedence Hierarchy:</strong>
        <p>In standard pseudocodes (C/Java/Infosys standard):</p>
        <ol>
          <li>Arithmetic addition (<code>+</code>) has higher precedence than bitwise AND.</li>
          <li>Bitwise AND (<code>&</code>) has higher precedence than bitwise XOR.</li>
          <li>Bitwise XOR (<code>^</code>) evaluates last.</li>
        </ol>
        <strong>Step-by-Step Evaluation:</strong>
        <ul>
          <li>Step 1: <code>c + 2 = 8 + 2 = 10</code></li>
          <li>Step 2: <code>b & 10 = 3 & 10 = 0011<sub>2</sub> & 1010<sub>2</sub> = 0010<sub>2</sub> = 2</code></li>
          <li>Step 3: <code>a ^ 2 = 5 ^ 2 = 0101<sub>2</sub> ^ 0010<sub>2</sub> = 0111<sub>2</sub> = <strong>7</strong></code></li>
        </ul>
        <p><strong>Common Trap:</strong> Left-to-right evaluation gives <code>(5 ^ 3) = 6</code>, <code>6 & 8 = 0</code>, <code>0 + 2 = 2</code> (Distractor A).</p>
        <p><strong>Final Output:</strong> <code>7</code>.</p>
      </div>
    `
  },
  {
    id: 14,
    sectionId: "bitwise",
    sectionTitle: "Bitwise Operations",
    title: "Question 14: Bitwise XOR Swap & Parity Branching",
    prompt: "What will be the output of the following pseudocode?",
    pseudocode: `Integer p, q, r
Set p = 14, q = 9, r = 6
p = p ^ q
q = p ^ q
p = p ^ q
if((p & 1) == (q & 1)) then
    r = (p | q) + (r << 1)
else
    r = (p & q) + (r >> 1)
end if
print r`,
    options: [
      { key: "A", text: "8" },
      { key: "B", text: "11" },
      { key: "C", text: "14" },
      { key: "D", text: "17" }
    ],
    correctAnswer: "B",
    correctText: "11",
    explanation: `
      <div class="exp-section">
        <strong>Analysis:</strong>
        <p>1. The first three statements perform an <strong>in-place XOR swap</strong> between <code>p</code> and <code>q</code>:</p>
        <ul>
          <li><code>p = 14 ^ 9 = 7</code></li>
          <li><code>q = 7 ^ 9 = 14</code></li>
          <li><code>p = 7 ^ 14 = 9</code></li>
          <li>Result: <code>p = 9</code>, <code>q = 14</code>.</li>
        </ul>
        <p>2. Condition check: <code>(p & 1) == (q & 1)</code></p>
        <ul>
          <li><code>9 & 1 = 1</code> (odd)</li>
          <li><code>14 & 1 = 0</code> (even)</li>
          <li><code>1 == 0</code> is FALSE &rarr; <code>else</code> branch executes!</li>
        </ul>
        <p>3. Else calculation: <code>r = (p & q) + (r >> 1)</code></p>
        <ul>
          <li><code>p & q = 9 & 14 = 1001<sub>2</sub> & 1110<sub>2</sub> = 1000<sub>2</sub> = 8</code></li>
          <li><code>r >> 1 = 6 >> 1 = 3</code></li>
          <li><code>r = 8 + 3 = <strong>11</strong></code></li>
        </ul>
        <p><strong>Final Output:</strong> <code>r = 11</code>.</p>
      </div>
    `
  },
  {
    id: 15,
    sectionId: "bitwise",
    sectionTitle: "Bitwise Operations",
    title: "Question 15: Kernighan Bit Stripping Algorithm",
    prompt: "What will be the output of the following pseudocode?",
    pseudocode: `Integer n, count, val
Set n = 45, count = 0, val = 1
while(n != 0)
    count = count + 1
    val = (val << 1) ^ (n & 1)
    n = n & (n - 1)
end while
print val + count`,
    options: [
      { key: "A", text: "24" },
      { key: "B", text: "28" },
      { key: "C", text: "32" },
      { key: "D", text: "20" }
    ],
    correctAnswer: "B",
    correctText: "28",
    explanation: `
      <div class="exp-section">
        <strong>Algorithm Overview:</strong>
        <p><code>n & (n - 1)</code> clears the lowest set bit in each iteration (Kernighan's bit count).</p>
        <p><code>n = 45 = 101101<sub>2</sub></code> (4 set bits, loop runs 4 times):</p>
        <ol>
          <li><strong>Iteration 1:</strong>
            <ul>
              <li><code>count = 1</code></li>
              <li><code>val = (1 << 1) ^ (45 & 1) = 2 ^ 1 = 3</code></li>
              <li><code>n = 45 & 44 = 44 (101100<sub>2</sub>)</code></li>
            </ul>
          </li>
          <li><strong>Iteration 2:</strong>
            <ul>
              <li><code>count = 2</code></li>
              <li><code>val = (3 << 1) ^ (44 & 1) = 6 ^ 0 = 6</code></li>
              <li><code>n = 44 & 43 = 40 (101000<sub>2</sub>)</code></li>
            </ul>
          </li>
          <li><strong>Iteration 3:</strong>
            <ul>
              <li><code>count = 3</code></li>
              <li><code>val = (6 << 1) ^ (40 & 1) = 12 ^ 0 = 12</code></li>
              <li><code>n = 40 & 39 = 32 (100000<sub>2</sub>)</code></li>
            </ul>
          </li>
          <li><strong>Iteration 4:</strong>
            <ul>
              <li><code>count = 4</code></li>
              <li><code>val = (12 << 1) ^ (32 & 1) = 24 ^ 0 = 24</code></li>
              <li><code>n = 32 & 31 = 0</code> (loop terminates)</li>
            </ul>
          </li>
        </ol>
        <p><strong>Print calculation:</strong> <code>val + count = 24 + 4 = <strong>28</strong></code>.</p>
      </div>
    `
  }
];
