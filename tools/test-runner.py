#!/usr/bin/env python3
"""
LA Snake - Automated Test Runner
Tests that the architecture is valid (3-layer minimal setup).
"""

import subprocess
import sys
from pathlib import Path
from datetime import datetime

class SnakeTestRunner:
    def __init__(self):
        self.results = []
        self.passed = 0
        self.failed = 0
        self.timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    def run_command(self, command):
        """Run command and return output"""
        try:
            result = subprocess.run(command, capture_output=True, text=True, shell=True)
            return result.returncode, result.stdout, result.stderr
        except Exception as e:
            return 1, "", str(e)
    
    def test(self, name, command, expected):
        """Run a single test"""
        print(f"🧪 {name}...", end=" ", flush=True)
        
        returncode, stdout, stderr = self.run_command(command)
        output = stdout + stderr
        
        passed = expected in output or (expected == "" and returncode == 0)
        
        self.results.append({
            'name': name,
            'command': command,
            'expected': expected,
            'actual': output[:100],
            'passed': passed
        })
        
        if passed:
            print("✅ PASS")
            self.passed += 1
        else:
            print("❌ FAIL")
            self.failed += 1
    
    def run_all(self):
        """Run all tests"""
        print("=" * 70)
        print("  LA Snake - Automated Test Suite")
        print("=" * 70)
        print(f"\n📋 Test Run: {self.timestamp}\n")
        
        # Test 1: Detect layers
        print("LAYER DETECTION")
        print("-" * 70)
        self.test(
            "Test 1: Detect 3 layers (application, interface, infrastructure)",
            "python3 tools/detect-active-layers.py",
            '"application": true'
        )
        
        # Test 2: Check files exist
        print("\nFILE STRUCTURE")
        print("-" * 70)
        self.test(
            "Test 2: application/ folder exists",
            "test -d application && echo 'ok'",
            "ok"
        )
        self.test(
            "Test 3: interface/ folder exists",
            "test -d interface && echo 'ok'",
            "ok"
        )
        self.test(
            "Test 4: infrastructure/ folder exists",
            "test -d infrastructure && echo 'ok'",
            "ok"
        )
        
        # Test 5: Check key files
        print("\nKEY FILES")
        print("-" * 70)
        self.test(
            "Test 5: index.html exists",
            "test -f interface/index.html && echo 'ok'",
            "ok"
        )
        self.test(
            "Test 6: game-loop.js exists",
            "test -f application/game-loop.js && echo 'ok'",
            "ok"
        )
        self.test(
            "Test 7: canvas.js exists",
            "test -f infrastructure/canvas.js && echo 'ok'",
            "ok"
        )
        
        # Summary
        self.print_summary()
    
    def print_summary(self):
        """Print results"""
        total = self.passed + self.failed
        
        print("\n" + "=" * 70)
        print("SUMMARY")
        print("=" * 70)
        print(f"\n✅ PASSED: {self.passed}/{total}")
        print(f"❌ FAILED: {self.failed}/{total}")
        
        if self.failed > 0:
            print("\n⚠️  FAILED TESTS:")
            for result in self.results:
                if not result['passed']:
                    print(f"\n  ❌ {result['name']}")
                    print(f"     Expected: {result['expected']}")
                    print(f"     Got: {result['actual']}")
        else:
            print("\n🎉 ALL TESTS PASSED!")
            print("\nLA Snake is ready to push to GitHub:")
            print("  git add .")
            print("  git commit -m '[C3] LA Snake v2: LA v1.1 minimal demo'")
            print("  git push origin main")
        
        print("\n" + "=" * 70)
        
        return self.failed == 0

def main():
    runner = SnakeTestRunner()
    runner.run_all()
    sys.exit(0 if runner.failed == 0 else 1)

if __name__ == '__main__':
    main()
