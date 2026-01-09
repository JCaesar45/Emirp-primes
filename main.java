import math

def emirps(input_data, return_as_array=False):
    """
    Function to find emirp numbers based on input parameters.
    
    Args:
        input_data: Either an integer n or a list/array [start, end] representing a range
        return_as_array: Boolean specifying if function should return array or single number
    
    Returns:
        Array of emirps, count of emirps, or nth emirp based on parameters
    """
    
    def is_prime(n):
        """Check if a number is prime"""
        if n < 2:
            return False
        if n == 2:
            return True
        if n % 2 == 0:
            return False
        for i in range(3, int(math.sqrt(n)) + 1, 2):
            if n % i == 0:
                return False
        return True
    
    def reverse_number(n):
        """Reverse the digits of a number"""
        return int(str(n)[::-1])
    
    def is_emirp(n):
        """Check if a number is an emirp"""
        if not is_prime(n):
            return False
        reversed_num = reverse_number(n)
        return n != reversed_num and is_prime(reversed_num)
    
    # If input is a number (n), find first n emirps or nth emirp
    if isinstance(input_data, int):
        emirp_list = []
        num = 13  # Start from the first emirp
        
        while len(emirp_list) < input_data:
            if is_emirp(num):
                emirp_list.append(num)
            num += 1
        
        return emirp_list if return_as_array else emirp_list[input_data - 1]
    
    # If input is a list/array [start, end], find emirps in range
    if isinstance(input_data, (list, tuple)) and len(input_data) == 2:
        start, end = input_data
        emirp_list = []
        
        for num in range(start, end + 1):
            if is_emirp(num):
                emirp_list.append(num)
        
        return emirp_list if return_as_array else len(emirp_list)
    
    raise ValueError('Invalid input format')

# Test cases
print(emirps(20, True))  # [13, 17, 31, 37, 71, 73, 79, 97, 107, 113, 149, 157, 167, 179, 199, 311, 337, 347, 359, 389]
print(emirps(1000))  # 70529
print(emirps([7700, 8000], True))  # [7717, 7757, 7817, 7841, 7867, 7879, 7901, 7927, 7949, 7951, 7963]
print(emirps([7700, 8000], False))  # 11
