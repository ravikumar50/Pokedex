#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int solution(vector<int>& A, int B) {
    int n = A.size();
    vector<int> minCost(n, INT_MAX);
    long long total = LLONG_MAX;
    
   
    for (int r = 0; r < n; ++r) {
        long long currCost = 1LL * r * B;
        for (int i = 0; i < n; ++i) {
            int ri = (i + r) % n;
            minCost[i] = min(minCost[i], A[ri]);
            currCost += minCost[i];
        }
        total = min(total, currCost);
    }
    return total;
}

int main() {
    // Example 1
    vector<int> A = {7, 4, 2, 1};
    int B = 3;
    cout << "Minimum cost: " << solution(A, B) << endl;

    // Example 2
    vector<int> A2 = {2, 3, 1};
    int B2 = 1;
    cout << "Minimum cost: " << solution(A2, B2) << endl;

    return 0;
}
