// constructor
Vec3 = function(x,y,z)
{
    this.x=x;
    this.y=y;
    this.z=z;
}

// Add method
Vec3.prototype.add = function(v)
{
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
}

//Sum method
Vec3.prototype.sum = function()
{
    return this.x + this.y + this.z;
}



//min method
Vec3.prototype.min = function()
{
    var min = this.x;
    if(this.x >= this.y)
    {
	min = this.y
    }
    if(min >= this.z)
    {
	min = this.z
    }

    return min;
}


//max method
Vec3.prototype.max = function()
{
    var max = this.x;
    if(this.x <= this.y)
    {
	max = this.y
    }
    if(max <= this.z)
    {
	max = this.z
    }

    return max;
}


//mid method
Vec3.prototype.mid = function()
{
    var min = this.x;
    var max = this.x;

    if(this.y<min)
    {
	min = this.y;
    }
    if(this.z<min)
    {
	min = this.z;
    }
    if(this.y>max)
    {
	max = this.y;
    }
    if(this.z>max)
    {
	max = this.z;
    }

    if(this.x!=min && this.x!=max)
    {
	mid = this.x;
    }
    if(this.y!=min && this.y!=max)
    {
	mid = this.y;
    }
    if(this.z!=min && this.z!=max)
    {
	mid = this.z;
    }
    
    return mid    

}
